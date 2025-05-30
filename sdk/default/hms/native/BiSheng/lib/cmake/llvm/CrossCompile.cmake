include(AddLLVM)
include(LLVMExternalProjectUtils)


function(llvm_create_cross_target project_name target_name toolchain buildtype)

  if(NOT DEFINED ${project_name}_${target_name}_BUILD)
    set(${project_name}_${target_name}_BUILD
      "${CMAKE_CURRENT_BINARY_DIR}/${target_name}")
    set(${project_name}_${target_name}_BUILD
      ${${project_name}_${target_name}_BUILD} PARENT_SCOPE)
    message(STATUS "Setting native build dir to " ${${project_name}_${target_name}_BUILD})
  endif(NOT DEFINED ${project_name}_${target_name}_BUILD)

  if (EXISTS ${LLVM_MAIN_SRC_DIR}/cmake/platforms/${toolchain}.cmake)
    set(CROSS_TOOLCHAIN_FLAGS_INIT
      -DCMAKE_TOOLCHAIN_FILE=\"${LLVM_MAIN_SRC_DIR}/cmake/platforms/${toolchain}.cmake\")
  elseif (NOT CMAKE_CROSSCOMPILING)
    set(CROSS_TOOLCHAIN_FLAGS_INIT
      -DCMAKE_C_COMPILER=${CMAKE_C_COMPILER}
      -DCMAKE_CXX_COMPILER=${CMAKE_CXX_COMPILER}
      )
  endif()
  set(CROSS_TOOLCHAIN_FLAGS_${target_name} ${CROSS_TOOLCHAIN_FLAGS_INIT}
    CACHE STRING "Toolchain configuration for ${target_name}")

  # project specific version of the flags up above
  set(CROSS_TOOLCHAIN_FLAGS_${project_name}_${target_name} ""
    CACHE STRING "Toolchain configuration for ${project_name}_${target_name}")

  if (buildtype)
    set(build_type_flags "-DCMAKE_BUILD_TYPE=${buildtype}")
  endif()
  if (LLVM_USE_LINKER AND NOT CMAKE_CROSSCOMPILING)
    set(linker_flag "-DLLVM_USE_LINKER=${LLVM_USE_LINKER}")
  endif()
  if (LLVM_EXTERNAL_CLANG_SOURCE_DIR)
    # Propagate LLVM_EXTERNAL_CLANG_SOURCE_DIR so that clang-tblgen can be built
    set(external_clang_dir "-DLLVM_EXTERNAL_CLANG_SOURCE_DIR=${LLVM_EXTERNAL_CLANG_SOURCE_DIR}")
  endif()

  add_custom_command(OUTPUT ${${project_name}_${target_name}_BUILD}
    COMMAND ${CMAKE_COMMAND} -E make_directory ${${project_name}_${target_name}_BUILD}
    COMMENT "Creating ${${project_name}_${target_name}_BUILD}...")

  add_custom_target(CREATE_${project_name}_${target_name}
    DEPENDS ${${project_name}_${target_name}_BUILD})

  # Escape semicolons in the targets list so that cmake doesn't expand
  # them to spaces.
  string(REPLACE ";" "$<SEMICOLON>" targets_to_build_arg
         "${LLVM_TARGETS_TO_BUILD}")
  string(REPLACE ";" "$<SEMICOLON>" experimental_targets_to_build_arg
         "${LLVM_EXPERIMENTAL_TARGETS_TO_BUILD}")

  string(REPLACE ";" "$<SEMICOLON>" llvm_enable_projects_arg
         "${LLVM_ENABLE_PROJECTS}")
  string(REPLACE ";" "$<SEMICOLON>" llvm_external_projects_arg
         "${LLVM_EXTERNAL_PROJECTS}")
  string(REPLACE ";" "$<SEMICOLON>" llvm_enable_runtimes_arg
         "${LLVM_ENABLE_RUNTIMES}")

  set(external_project_source_dirs)
  foreach(project ${LLVM_EXTERNAL_PROJECTS})
    canonicalize_tool_name(${project} name)
    list(APPEND external_project_source_dirs
         "-DLLVM_EXTERNAL_${name}_SOURCE_DIR=${LLVM_EXTERNAL_${name}_SOURCE_DIR}")
  endforeach()

  add_custom_command(OUTPUT ${${project_name}_${target_name}_BUILD}/CMakeCache.txt
    COMMAND ${CMAKE_COMMAND} -G "${CMAKE_GENERATOR}"
        -DCMAKE_MAKE_PROGRAM="${CMAKE_MAKE_PROGRAM}"
        -DCMAKE_C_COMPILER_LAUNCHER="${CMAKE_C_COMPILER_LAUNCHER}"
        -DCMAKE_CXX_COMPILER_LAUNCHER="${CMAKE_CXX_COMPILER_LAUNCHER}"
        ${CROSS_TOOLCHAIN_FLAGS_${target_name}} ${CMAKE_CURRENT_SOURCE_DIR}
        ${CROSS_TOOLCHAIN_FLAGS_${project_name}_${target_name}}
        -DLLVM_TARGET_IS_CROSSCOMPILE_HOST=TRUE
        -DLLVM_TARGETS_TO_BUILD="${targets_to_build_arg}"
        -DLLVM_EXPERIMENTAL_TARGETS_TO_BUILD="${experimental_targets_to_build_arg}"
        -DLLVM_DEFAULT_TARGET_TRIPLE="${LLVM_TARGET_TRIPLE}"
        -DLLVM_TARGET_ARCH="${LLVM_TARGET_ARCH}"
        -DLLVM_ENABLE_PROJECTS="${llvm_enable_projects_arg}"
        -DLLVM_EXTERNAL_PROJECTS="${llvm_external_projects_arg}"
        -DLLVM_ENABLE_RUNTIMES="${llvm_enable_runtimes_arg}"
        -DLLVM_BSPUB_COMMON="${LLVM_BSPUB_COMMON}"
        -DLLVM_BSPRIV_COMMON_SAMPLE_PGO="${LLVM_BSPRIV_COMMON_SAMPLE_PGO}"
        -DLLVM_BSPRIV_COMMON="${LLVM_BSPRIV_COMMON}"
        -DLLVM_BSPRIV_COMMON_ALIAS_ANALYSIS="${LLVM_BSPRIV_COMMON_ALIAS_ANALYSIS}"
        -DLLVM_BSPRIV_COMMON_ARRAY_COMPUTATION_REDUCTION="${LLVM_BSPRIV_COMMON_ARRAY_COMPUTATION_REDUCTION}"
        -DLLVM_BSPRIV_COMMON_ARRAY_RESTRUCTURING="${LLVM_BSPRIV_COMMON_ARRAY_RESTRUCTURING}"
        -DLLVM_BSPRIV_COMMON_AUTO_TUNING="${LLVM_BSPRIV_COMMON_AUTO_TUNING}"
        -DLLVM_BSPRIV_COMMON_BLOCK_REORDER="${LLVM_BSPRIV_COMMON_BLOCK_REORDER}"
        -DLLVM_BSPRIV_COMMON_BOSCC="${LLVM_BSPRIV_COMMON_BOSCC}"
        -DLLVM_BSPRIV_COMMON_BRANCH_PROBABILITY_INFO="${LLVM_BSPRIV_COMMON_BRANCH_PROBABILITY_INFO}"
        -DLLVM_BSPRIV_COMMON_COALESCER="${LLVM_BSPRIV_COMMON_COALESCER}"
        -DLLVM_BSPRIV_COMMON_CODE_MOVER_UTILS="${LLVM_BSPRIV_COMMON_CODE_MOVER_UTILS}"
        -DLLVM_BSPRIV_COMMON_COMPILER_RT="${LVLM_BSPRIV_COMMON_COMPILER_RT}"
        -DLLVM_BSPRIV_COMMON_CORRELATED_VALUE_PROPAGATION="${LLVM_BSPRIV_COMMON_CORRELATED_VALUE_PROPAGATION}"
        -DLLVM_BSPRIV_COMMON_DDG="${LLVM_BSPRIV_COMMON_DDG}"
        -DLLVM_BSPRIV_COMMON_DEPENDENCE_ANALYSIS="${LLVM_BSPRIV_COMMON_DEPENDENCE_ANALYSIS}"
        -DLLVM_BSPRIV_COMMON_FUNCTION_ATTRS="${LLVM_BSPRIV_COMMON_FUNCTION_ATTRS}"
        -DLLVM_BSPRIV_COMMON_FUNCTION_LOOP_FUSION="${LLVM_BSPRIV_COMMON_FUNCTION_LOOP_FUSION}"
        -DLLVM_BSPRIV_COMMON_FUNCTION_SPECIALIZATION="${LLVM_BSPRIV_COMMON_FUNCTION_SPECIALIZATION}"
        -DLLVM_BSPRIV_COMMON_GEP="${LLVM_BSPRIV_COMMON_GEP}"
        -DLLVM_BSPRIV_COMMON_GPU_DELEGATE="${LLVM_BSPRIV_COMMON_GPU_DELEGATE}"
        -DLLVM_BSPRIV_COMMON_INST_PREFETCH="${LLVM_BSPRIV_COMMON_INST_PREFETCH}"
        -DLLVM_BSPRIV_COMMON_GVN="${LLVM_BSPRIV_COMMON_GVN}"
        -DLLVM_BSPRIV_COMMON_HASH_DATA_PREFETCH="${LLVM_BSPRIV_COMMON_HASH_DATA_PREFETCH}"
        -DLLVM_BSPRIV_COMMON_IND_VAR_SIMPLIFY="${LLVM_BSPRIV_COMMON_IND_VAR_SIMPLIFY}"
        -DLLVM_BSPRIV_COMMON_INLINE="${LLVM_BSPRIV_COMMON_INLINE}"
        -DLLVM_BSPRIV_COMMON_IPOP="${LLVM_BSPRIV_COMMON_IPOP}"
        -DLLVM_BSPRIV_COMMON_IR_LIBRARY_INJECTION="${LLVM_BSPRIV_COMMON_IR_LIBRARY_INJECTION}"
        -DLLVM_BSPRIV_COMMON_IVDEP="${LLVM_BSPRIV_COMMON_IVDEP}"
        -DLLVM_BSPRIV_COMMON_IV_DESCRIPTOR="${LLVM_BSPRIV_COMMON_IV_DESCRIPTOR}"
        -DLLVM_BSPRIV_COMMON_LAZY_VALUE_INFO="${LLVM_BSPRIV_COMMON_LAZY_VALUE_INFO}"
        -DLLVM_BSPRIV_COMMON_LICM="${LLVM_BSPRIV_COMMON_LICM}"
        -DLLVM_BSPRIV_COMMON_LOOP_DATA_PREFETCH="${LLVM_BSPRIV_COMMON_LOOP_DATA_PREFETCH}"
        -DLLVM_BSPRIV_COMMON_LOOP_DISTRIBUTE="${LLVM_BSPRIV_COMMON_LOOP_DISTRIBUTE}"
        -DLLVM_BSPRIV_COMMON_LOOP_IDIOM_RECOGNIZE="${LLVM_BSPRIV_COMMON_LOOP_IDIOM_RECOGNIZE}"
        -DLLVM_BSPRIV_COMMON_LOOP_INTERCHANGE="${LLVM_BSPRIV_COMMON_LOOP_INTERCHANGE}"
        -DLLVM_BSPRIV_COMMON_LOOP_LOAD_ELIMINATION="${LLVM_BSPRIV_COMMON_LOOP_LOAD_ELIMINATION}"
        -DLLVM_BSPRIV_COMMON_LOOP_LOAD_WIDEN="${LLVM_BSPRIV_COMMON_LOOP_LOAD_WIDEN}"
        -DLLVM_BSPRIV_COMMON_LOOP_SPLIT="${LLVM_BSPRIV_COMMON_LOOP_SPLIT}"
        -DLLVM_BSPRIV_COMMON_LOOP_STRENGTH_REDUCE="${LLVM_BSPRIV_COMMON_LOOP_STRENGTH_REDUCE}"
        -DLLVM_BSPRIV_COMMON_LOOP_TILING="${LLVM_BSPRIV_COMMON_LOOP_TILING}"
        -DLLVM_BSPRIV_COMMON_LOOP_VECTORIZE="${LLVM_BSPRIV_COMMON_LOOP_VECTORIZE}"
        -DLLVM_BSPRIV_COMMON_MEMORY_SSA="${LLVM_BSPRIV_COMMON_MEMORY_SSA}"
        -DLLVM_BSPRIV_COMMON_OPENMP="${LLVM_BSPRIV_COMMON_OPENMP}"
        -DLLVM_BSPRIV_COMMON_PROPAGATE_ALIGNMENT="${LLVM_BSPRIV_COMMON_PROPAGATE_ALIGNMENT}"
        -DLLVM_BSPRIV_COMMON_REASSOCIATE="${LLVM_BSPRIV_COMMON_REASSOCIATE}"
        -DLLVM_BSPRIV_COMMON_REGALLOC_GREEDY="${LLVM_BSPRIV_COMMON_REGALLOC_GREEDY}"
        -DLLVM_BSPRIV_COMMON_SELECTION_DAG="${LLVM_BSPRIV_COMMON_SELECTION_DAG}"
        -DLLVM_BSPRIV_COMMON_SIMPLIFY_CFG="${LLVM_BSPRIV_COMMON_SIMPLIFY_CFG}"
        -DLLVM_BSPRIV_COMMON_SINK="${LLVM_BSPRIV_COMMON_SINK}"
        -DLLVM_BSPRIV_COMMON_SLP_VECTORIZER="${LLVM_BSPRIV_COMMON_SLP_VECTORIZER}"
        -DLLVM_BSPRIV_COMMON_STRUCT_PEELING="${LLVM_BSPRIV_COMMON_STRUCT_PEELING}"
        -DLLVM_BSPRIV_COMMON_STRUCT_REPACKING="${LLVM_BSPRIV_COMMON_STRUCT_REPACKING}"
        -DLLVM_BSPRIV_COMMON_UNROLL="${LLVM_BSPRIV_COMMON_UNROLL}"
        -DLLVM_BSPRIV_COMMON_VECTOR_COMBINE="${LLVM_BSPRIV_COMMON_VECTOR_COMBINE}"
        -DLLVM_BSPRIV_AARCH64_PLT_INLINING="${LLVM_BSPRIV_AARCH64_PLT_INLINING}"
        -DLLVM_BSPRIV_AARCH64="${LLVM_BSPRIV_AARCH64}"
        -DLLVM_BSPRIV_AARCH64_COMPLEX="${LLVM_BSPRIV_AARCH64_COMPLEX}"
        -DLLVM_BSPRIV_AARCH64_CONDITION_OPTIMIZER="${LLVM_BSPRIV_AARCH64_CONDITION_OPTIMIZER}"
        -DLLVM_BSPRIV_AARCH64_HBM="${LLVM_BSPRIV_AARCH64_HBM}"
        -DLLVM_BSPRIV_AARCH64_ILP32="${LLVM_BSPRIV_AARCH64_ILP32}"
        -DLLVM_BSPRIV_AARCH64_LINX="${LLVM_BSPRIV_AARCH64_LINX}"
        -DLLVM_BSPRIV_AARCH64_MATH_LIBS="${LLVM_BSPRIV_AARCH64_MATH_LIBS}"
        -DLLVM_BSPRIV_AARCH64_PRECISION="${LLVM_BSPRIV_AARCH64_PRECISION}"
        -DLLVM_BSPRIV_AARCH64_SCHEDULING="${LLVM_BSPRIV_AARCH64_SCHEDULING}"
        -DLLVM_BSPRIV_AARCH64_SME="${LLVM_BSPRIV_AARCH64_SME}"
        ${external_project_source_dirs}
        -DLLVM_TEMPORARILY_ALLOW_OLD_TOOLCHAIN="${LLVM_TEMPORARILY_ALLOW_OLD_TOOLCHAIN}"
        ${build_type_flags} ${linker_flag} ${external_clang_dir}
        ${ARGN}
    WORKING_DIRECTORY ${${project_name}_${target_name}_BUILD}
    DEPENDS CREATE_${project_name}_${target_name}
    COMMENT "Configuring ${target_name} ${project_name}...")

  add_custom_target(CONFIGURE_${project_name}_${target_name}
    DEPENDS ${${project_name}_${target_name}_BUILD}/CMakeCache.txt)

endfunction()

# Sets up a native build for a tool, used e.g. for cross-compilation and
# LLVM_OPTIMIZED_TABLEGEN. Always builds in Release.
# - target: The target to build natively
# - output_path_var: A variable name which receives the path to the built target
# - DEPENDS: Any additional dependencies for the target
function(build_native_tool target output_path_var)
  cmake_parse_arguments(ARG "" "" "DEPENDS" ${ARGN})

  if(CMAKE_CONFIGURATION_TYPES)
    set(output_path "${${PROJECT_NAME}_NATIVE_BUILD}/Release/bin/${target}")
  else()
    set(output_path "${${PROJECT_NAME}_NATIVE_BUILD}/bin/${target}")
  endif()
  set(output_path ${output_path}${LLVM_HOST_EXECUTABLE_SUFFIX})

  llvm_ExternalProject_BuildCmd(build_cmd ${target} ${${PROJECT_NAME}_NATIVE_BUILD}
                                CONFIGURATION Release)
  add_custom_command(OUTPUT "${output_path}"
                     COMMAND ${build_cmd}
                     DEPENDS CONFIGURE_${PROJECT_NAME}_NATIVE ${ARG_DEPENDS}
                     WORKING_DIRECTORY "${${PROJECT_NAME}_NATIVE_BUILD}"
                     COMMENT "Building native ${target}..."
                     USES_TERMINAL)
  set(${output_path_var} "${output_path}" PARENT_SCOPE)
endfunction()
