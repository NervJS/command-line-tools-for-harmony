/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Provide map component.
 * @bundle com.huawei.hms.mapservice.kit/mapLibrary/ets/MapComponent 5.0.0(12)
 * @kit MapKit
 */
import { AsyncCallback } from '@ohos.base';
import mapCommon from '@hms.core.map.mapCommon';
import map from '@hms.core.map.map';
/**
 * Provides map component, the caller needs to provide mapOptions and callback, and
 * the caller can get MapComponentController object by callback.
 *
 * @struct { MapComponent }
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
@Component
export struct MapComponent {
    /**
     * Indicates the information to initialize the map.
     *
     * @type { mapCommon.MapOptions }
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    mapOptions: mapCommon.MapOptions;
    /**
     * Indicates the callback function when the map is initialized.
     *
     * @type { AsyncCallback<map.MapComponentController> }
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    mapCallback: AsyncCallback<map.MapComponentController>;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    build(): void;
    /**
     * The custom info window.
     *
     * @type { customInfoWindowCallback }
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    @BuilderParam
    customInfoWindow: customInfoWindowCallback;
}
/**
 * The custom info window callback.
 *
 * @typedef { object }
 * @param { map.MarkerDelegate } markerDelegate - marker delegate object.
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
export type customInfoWindowCallback = (markerDelegate: map.MarkerDelegate) => void;
