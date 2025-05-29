var group___net_connection =
[
    [ "net_connection.h", "net__connection_8h.html", null ],
    [ "net_connection_type.h", "net__connection__type_8h.html", null ],
    [ "NetConn_NetHandle", "struct_net_conn___net_handle.html", [
      [ "netId", "struct_net_conn___net_handle.html#ad19348667b61583302ed2b1c8762a735", null ]
    ] ],
    [ "NetConn_NetCapabilities", "struct_net_conn___net_capabilities.html", [
      [ "bearerTypes", "struct_net_conn___net_capabilities.html#a4f6ec707d52395fc0f3613d81d6a1b90", null ],
      [ "bearerTypesSize", "struct_net_conn___net_capabilities.html#af09440d7c57b7052c640dc71ca8e8bb9", null ],
      [ "linkDownBandwidthKbps", "struct_net_conn___net_capabilities.html#a980428dec73f50d0605762d2e9fe5ecf", null ],
      [ "linkUpBandwidthKbps", "struct_net_conn___net_capabilities.html#a31abcca15e05bc6b06e7389e72f76bb9", null ],
      [ "netCaps", "struct_net_conn___net_capabilities.html#a0606af2214e6af805199c328014be1a1", null ],
      [ "netCapsSize", "struct_net_conn___net_capabilities.html#a6a40049f9a3fa797c641a66630340eaf", null ]
    ] ],
    [ "NetConn_NetAddr", "struct_net_conn___net_addr.html", [
      [ "address", "struct_net_conn___net_addr.html#a5a0d77e3166d925be7a554166b607a02", null ],
      [ "family", "struct_net_conn___net_addr.html#a29abf4e2a426a6fe4f05b9f50311c42c", null ],
      [ "port", "struct_net_conn___net_addr.html#ac5f64807df5a72a63858f9bebc2050c7", null ],
      [ "prefixlen", "struct_net_conn___net_addr.html#a248485d1b3916a3f8e76373d93ebed5d", null ]
    ] ],
    [ "NetConn_Route", "struct_net_conn___route.html", [
      [ "destination", "struct_net_conn___route.html#ab179f3c4f25ee0931756b68d2350dbff", null ],
      [ "gateway", "struct_net_conn___route.html#ad961dfd60e995cc8d1d835be692f8b99", null ],
      [ "hasGateway", "struct_net_conn___route.html#a560bf2b02b9cf9f4dddc61a6da642ed7", null ],
      [ "iface", "struct_net_conn___route.html#a97b8740f2f83ae7289b8a1fda05bbda0", null ],
      [ "isDefaultRoute", "struct_net_conn___route.html#ac1775dc35ecc947283f5f8b46d526b8e", null ]
    ] ],
    [ "NetConn_HttpProxy", "struct_net_conn___http_proxy.html", [
      [ "exclusionList", "struct_net_conn___http_proxy.html#a47c0c03b464b30111f4c7d538c6c7bf3", null ],
      [ "exclusionListSize", "struct_net_conn___http_proxy.html#a3346686564cae79f1c249b99d3cf9282", null ],
      [ "host", "struct_net_conn___http_proxy.html#abf9dc448d07b24a63110dbda52302dae", null ],
      [ "port", "struct_net_conn___http_proxy.html#a73ee2d9b3792e4ca49af965ef958330e", null ]
    ] ],
    [ "NetConn_ConnectionProperties", "struct_net_conn___connection_properties.html", [
      [ "dnsList", "struct_net_conn___connection_properties.html#ac02750f0fb285052ebfb379ef3828293", null ],
      [ "dnsListSize", "struct_net_conn___connection_properties.html#a4c56e31886c25313876e41b97c648276", null ],
      [ "domain", "struct_net_conn___connection_properties.html#a5c851936dd2f583a166697267e6e2e03", null ],
      [ "httpProxy", "struct_net_conn___connection_properties.html#aca2f2c5a79cd00bbbf4f4603a5ca5910", null ],
      [ "ifaceName", "struct_net_conn___connection_properties.html#ac6764ed385c76b4be8d1a06718c4d6d3", null ],
      [ "mtu", "struct_net_conn___connection_properties.html#a06e78661129641ef51f0d9f3ac652d64", null ],
      [ "netAddrList", "struct_net_conn___connection_properties.html#afe96e5288ba1e47c857521ef39c237a2", null ],
      [ "netAddrListSize", "struct_net_conn___connection_properties.html#a725913c795393ce15fd2e1b348dcd6c2", null ],
      [ "routeList", "struct_net_conn___connection_properties.html#a18c43bee7e2cab3d7a2deca6a0bbb2e4", null ],
      [ "routeListSize", "struct_net_conn___connection_properties.html#a7afb405e67696a0d0b1162b80d7b2b09", null ],
      [ "tcpBufferSizes", "struct_net_conn___connection_properties.html#a31cfe02bfb47343651dc76857d44b777", null ]
    ] ],
    [ "NetConn_NetHandleList", "struct_net_conn___net_handle_list.html", [
      [ "netHandleListSize", "struct_net_conn___net_handle_list.html#a6c03f4b8f5c2b9b29a6febf2a51699db", null ],
      [ "netHandles", "struct_net_conn___net_handle_list.html#a3fc9251b37ed28267a8b622f25043c99", null ]
    ] ],
    [ "NetConn_NetSpecifier", "struct_net_conn___net_specifier.html", [
      [ "bearerPrivateIdentifier", "struct_net_conn___net_specifier.html#a2e32cb8fcf22fd9ff3c0b44273b73172", null ],
      [ "caps", "struct_net_conn___net_specifier.html#abbda9d561af23fb7869c3cbadb156fbe", null ]
    ] ],
    [ "NetConn_NetConnCallback", "struct_net_conn___net_conn_callback.html", [
      [ "onConnetionProperties", "struct_net_conn___net_conn_callback.html#a3381a2a263882c1162aa6fb4c018cacb", null ],
      [ "onNetBlockStatusChange", "struct_net_conn___net_conn_callback.html#a4b227189f123d46ac236a94b71387d3d", null ],
      [ "onNetCapabilitiesChange", "struct_net_conn___net_conn_callback.html#a82bbe4eb49cc190f06dcd29cf89c60e7", null ],
      [ "onNetLost", "struct_net_conn___net_conn_callback.html#a2fb70290feec46f942a15fbe629e80fc", null ],
      [ "onNetUnavailable", "struct_net_conn___net_conn_callback.html#af0ed8702e6d34a2eb1da588dfb2737c4", null ],
      [ "onNetworkAvailable", "struct_net_conn___net_conn_callback.html#aa1f9b53d2614d0c2a702ee6da1b297f6", null ]
    ] ],
    [ "NetConn_ConnectionProperties", "group___net_connection.html#ga97e5e4d4ef2bfae1e5aa301f4a0b51b5", null ],
    [ "NetConn_ErrorCode", "group___net_connection.html#ga70e0e380d7cda7d279bcac416fef52b2", null ],
    [ "NetConn_HttpProxy", "group___net_connection.html#gaeffcb06eca0815751fe6b6a2b38f8234", null ],
    [ "NetConn_NetAddr", "group___net_connection.html#ga74359af9b82716bf993b124da8e4d1e7", null ],
    [ "NetConn_NetBearerType", "group___net_connection.html#ga50dd998855ac3ac5cf7b7173edbb0907", null ],
    [ "NetConn_NetCap", "group___net_connection.html#ga4b6d23bf2b3bf928cdfbaa9dc8374461", null ],
    [ "NetConn_NetCapabilities", "group___net_connection.html#gaa78d9e518f40868f8c018d9c213d2523", null ],
    [ "NetConn_NetConnCallback", "group___net_connection.html#gac5bff623760d503ab0696287ceeade65", null ],
    [ "NetConn_NetHandle", "group___net_connection.html#gab81f25ceb0f3908821366de0089df0c5", null ],
    [ "NetConn_NetHandleList", "group___net_connection.html#gac02808509eb69e32cecf0669a339c091", null ],
    [ "NetConn_NetSpecifier", "group___net_connection.html#gaa84c9464c40aaf42fb646fee8076c24f", null ],
    [ "NetConn_Route", "group___net_connection.html#gacd5ed16ac10dccd337c690e222ab6dc2", null ],
    [ "OH_NetConn_AppHttpProxyChange", "group___net_connection.html#gacaf398ae08a7dbf48fdd2112de9bd23f", null ],
    [ "OH_NetConn_CustomDnsResolver", "group___net_connection.html#gaa6acc28fcf8a4bdaf0079cab8318946b", null ],
    [ "OH_NetConn_NetBlockStatusChange", "group___net_connection.html#ga7808dc6e725dba46f92c6ede2dac4b1b", null ],
    [ "OH_NetConn_NetCapabilitiesChange", "group___net_connection.html#ga12b8f267a98896c39a02ba2da73ed2db", null ],
    [ "OH_NetConn_NetConnectionPropertiesChange", "group___net_connection.html#gac0e8a53015bfb473d2e69645928a5d56", null ],
    [ "OH_NetConn_NetLost", "group___net_connection.html#ga90c7e98d7efc089f12ce63c00418a204", null ],
    [ "OH_NetConn_NetUnavailable", "group___net_connection.html#gae22ae4636597f5aba05fc47bb5c84ce6", null ],
    [ "OH_NetConn_NetworkAvailable", "group___net_connection.html#gaa6e165e227afb97dc0eb886521b63a49", null ],
    [ "NetConn_ErrorCode", "group___net_connection.html#ga2c2104d7b6c8998f0e43e758b78b2765", [
      [ "NETCONN_SUCCESS", "group___net_connection.html#gga2c2104d7b6c8998f0e43e758b78b2765a7809be14f7d58561e3dc442bf69c2a81", null ],
      [ "NETCONN_PERMISSION_DENIED", "group___net_connection.html#gga2c2104d7b6c8998f0e43e758b78b2765af17af7f442e4c8f9f681fa6a467ffdf1", null ],
      [ "NETCONN_PARAMETER_ERROR", "group___net_connection.html#gga2c2104d7b6c8998f0e43e758b78b2765a51afdbd25a3f5ca1cbac757663b1220a", null ],
      [ "NETCONN_OPERATION_FAILED", "group___net_connection.html#gga2c2104d7b6c8998f0e43e758b78b2765ac6f18ef9339f12946d3243593ed881fd", null ],
      [ "NETCONN_INTERNAL_ERROR", "group___net_connection.html#gga2c2104d7b6c8998f0e43e758b78b2765a80449881425f40f12790e4d7a99ed5a5", null ]
    ] ],
    [ "NetConn_NetBearerType", "group___net_connection.html#ga7c6e6ce44c476c16c0a1a06b85435b26", [
      [ "NETCONN_BEARER_CELLULAR", "group___net_connection.html#gga7c6e6ce44c476c16c0a1a06b85435b26a471b8ec1ae836d27db87a727a440dfad", null ],
      [ "NETCONN_BEARER_WIFI", "group___net_connection.html#gga7c6e6ce44c476c16c0a1a06b85435b26a38bf40489f01cc6cf510553a1b6878f4", null ],
      [ "NETCONN_BEARER_BLUETOOTH", "group___net_connection.html#gga7c6e6ce44c476c16c0a1a06b85435b26a958501fc164540d6c88faf1a30ce6a8d", null ],
      [ "NETCONN_BEARER_ETHERNET", "group___net_connection.html#gga7c6e6ce44c476c16c0a1a06b85435b26a0260288576f95b20791355709179edfd", null ],
      [ "NETCONN_BEARER_VPN", "group___net_connection.html#gga7c6e6ce44c476c16c0a1a06b85435b26a2c0a5e6e96535ff7cb617fa0ec369747", null ]
    ] ],
    [ "NetConn_NetCap", "group___net_connection.html#ga52718c8e4512496b8a83504e10307861", [
      [ "NETCONN_NET_CAPABILITY_MMS", "group___net_connection.html#gga52718c8e4512496b8a83504e10307861a71a02f9f3ce5a2fdb81f6c37ef14a050", null ],
      [ "NETCONN_NET_CAPABILITY_NOT_METERED", "group___net_connection.html#gga52718c8e4512496b8a83504e10307861a832dc77f14f4049f4d6d4f1a5b4ef241", null ],
      [ "NETCONN_NET_CAPABILITY_INTERNET", "group___net_connection.html#gga52718c8e4512496b8a83504e10307861a6ce052af032f7aea165d77476accbc5c", null ],
      [ "NETCONN_NET_CAPABILITY_NOT_VPN", "group___net_connection.html#gga52718c8e4512496b8a83504e10307861acec8a1f8e84b09e01eb26c40e607738b", null ],
      [ "NETCONN_NET_CAPABILITY_VALIDATED", "group___net_connection.html#gga52718c8e4512496b8a83504e10307861a2e6e94a11d4a52ca0c102a14f5927f5f", null ],
      [ "NETCONN_NET_CAPABILITY_PORTAL", "group___net_connection.html#gga52718c8e4512496b8a83504e10307861addf1b9425a5d68391238679383e67e61", null ],
      [ "NETCONN_NET_CAPABILITY_CHECKING_CONNECTIVITY", "group___net_connection.html#gga52718c8e4512496b8a83504e10307861a293db96bf7ce4be10ee4b97799ebae27", null ]
    ] ],
    [ "OH_NetConn_BindSocket", "group___net_connection.html#gafb30d88ad0f1a0e2ac8f575ee8c3be09", null ],
    [ "OH_NetConn_FreeDnsResult", "group___net_connection.html#ga632aa2b6c6c62532159e44c4ee4a2c6c", null ],
    [ "OH_NetConn_GetAddrInfo", "group___net_connection.html#ga027ed5c19dfd841a0279b75a2d5890ee", null ],
    [ "OH_NetConn_GetAllNets", "group___net_connection.html#gab209bc5fc1db4d7e6fa728ceda685752", null ],
    [ "OH_NetConn_GetConnectionProperties", "group___net_connection.html#ga89d23644424683a6bc4c36e8daf66614", null ],
    [ "OH_NetConn_GetDefaultHttpProxy", "group___net_connection.html#ga0d1c4fc8e45c398ccd2032a270cf36c7", null ],
    [ "OH_NetConn_GetDefaultNet", "group___net_connection.html#ga8dc846139da86e5b49a57da83d89d00a", null ],
    [ "OH_NetConn_GetNetCapabilities", "group___net_connection.html#ga125877952039e7b6247707d8493d77b7", null ],
    [ "OH_NetConn_GetPacUrl", "group___net_connection.html#gaf7f5401888893d77aff547affa76d5fa", null ],
    [ "OH_NetConn_HasDefaultNet", "group___net_connection.html#ga70a4bb277b8cf66fbdf2637bd04baf8c", null ],
    [ "OH_NetConn_IsDefaultNetMetered", "group___net_connection.html#gabf1126ba2a5f56490c76746d8e2a8159", null ],
    [ "OH_NetConn_RegisterAppHttpProxyCallback", "group___net_connection.html#gaee212b597753583ed62f9d18255015d2", null ],
    [ "OH_NetConn_RegisterDefaultNetConnCallback", "group___net_connection.html#ga5265d517bc5a148a357d19e23c188e86", null ],
    [ "OH_NetConn_RegisterDnsResolver", "group___net_connection.html#gac76ca04eaf7f379fb8cbbae742077e92", null ],
    [ "OH_NetConn_RegisterNetConnCallback", "group___net_connection.html#ga785cf96f7cd7e55479842c3977da4fe2", null ],
    [ "OH_NetConn_SetAppHttpProxy", "group___net_connection.html#gad5ecbf1cad509886a1b338053f702572", null ],
    [ "OH_NetConn_SetPacUrl", "group___net_connection.html#ga5ffe2887af18d7b9ea40bc87c46c1eb3", null ],
    [ "OH_NetConn_UnregisterAppHttpProxyCallback", "group___net_connection.html#ga674eaefe0a72c57756fe55a23548e61f", null ],
    [ "OH_NetConn_UnregisterDnsResolver", "group___net_connection.html#ga9daf86b0ed586731faf869b71c71dd02", null ],
    [ "OH_NetConn_UnregisterNetConnCallback", "group___net_connection.html#ga65997e2fb555f631744e3d345d266b94", null ],
    [ "OHOS_NetConn_RegisterDnsResolver", "group___net_connection.html#ga939eec566f6a107ccb095405aa53677b", null ],
    [ "OHOS_NetConn_UnregisterDnsResolver", "group___net_connection.html#ga7f969da81c377058237bde5350b1d6e1", null ]
];