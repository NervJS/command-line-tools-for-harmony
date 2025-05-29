/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Provide the ability to open petal maps app.
 * @kit MapKit
 */
import type common from '@ohos.app.ability.common';
import type mapCommon from '@hms.core.map.mapCommon';
/**
 * Provide the ability to open petal maps app.
 *
 * @namespace petalMaps
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @since 5.0.3(15)
 */
declare namespace petalMaps {
    /**
     * Open the home page of map app.
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    function openMapHomePage(context: common.Context): Promise<void>;
    /**
     * Open the poi detail page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { PoiDetailParams } poiDetailParams - The poi detail parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    function openMapPoiDetail(context: common.Context, poiDetailParams: PoiDetailParams): Promise<void>;
    /**
     * Open the text search page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { TextSearchParams } textSearchParams - The text search parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    function openMapTextSearch(context: common.Context, textSearchParams: TextSearchParams): Promise<void>;
    /**
     * Open the route plan page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { RoutePlanParams } routePlanParams - The route plan parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    function openMapRoutePlan(context: common.Context, routePlanParams: RoutePlanParams): Promise<void>;
    /**
     * Open the navigation page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { NaviParams } naviParams - The navigation parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    function openMapNavi(context: common.Context, naviParams: NaviParams): Promise<void>;
    /**
     * Poi detail params.
     * @typedef PoiDetailParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface PoiDetailParams {
        /**
         * destination position.
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPosition: mapCommon.LatLng;
        /**
         * destination name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
        /**
         * destination poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPoiId?: string;
    }
    /**
     * Text search params.
     * @typedef TextSearchParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface TextSearchParams {
        /**
         * destination name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
    }
    /**
     * Route params.
     * @typedef RoutePlanParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface RoutePlanParams {
        /**
         * origin position.
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        originPosition?: mapCommon.LatLng;
        /**
         * origin name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        originName?: string;
        /**
         * origin poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        originPoiId?: string;
        /**
         * destination position.
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPosition: mapCommon.LatLng;
        /**
         * destination name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
        /**
         * destination poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPoiId?: string;
        /**
         * vehicle type.
         * @type { ?VehicleType }
         * @default DRIVING
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        vehicleType?: VehicleType;
    }
    /**
     * Navigation params.
     * @typedef NaviParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface NaviParams {
        /**
         * destination position.
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPosition: mapCommon.LatLng;
        /**
         * destination name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
        /**
         * destination poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPoiId?: string;
        /**
         * vehicle type.
         * @type { ?VehicleType }
         * @default DRIVING
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        vehicleType?: VehicleType;
    }
    /**
     * Vehicle type.
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    enum VehicleType {
        /**
         * Driving type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        DRIVING = 0,
        /**
         * Walking type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        WALKING = 1,
        /**
         * Cycling type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        CYCLING = 2
    }
}
export default petalMaps;
