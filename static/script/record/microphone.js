var microphone = (function() {
    function isIE() {
        return !!window.ActiveXObject || 'ActiveXObject' in window ? true : false
    }
    var _volume = function(id, vol) {
        var volID = document.getElementById(id);
        volID.innerHTML = '<div style="width: 120px;height: 120px;border-radius: 60px;background: #fff;border:#daf3fc 1px solid;position: relative;">' +
            '<span style="display: block;width: 30px;height: 65px;position: absolute;left: 9px;top:26px;">' +
            '<span style="display: block;position:relative;width: 30px;height: 32px;margin-bottom: 1px;">' +
            '<i style="display: block;position: absolute;left: 0;bottom: 0;width: 2px;background: #c5f0ff;height:' + 11 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.4) + '"></i>' +
            '<i style="display: block;position: absolute;left: 4px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 14 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 8px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 17 * vol / 100 + 'px;opacity:' + (vol / 100 + 0) + '"></i>' +
            '<i style="display: block;position: absolute;left: 12px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 20 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 16px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 23 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.4) + '"></i>' +
            '<i style="display: block;position: absolute;left: 20px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 26 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.6) + '"></i>' +
            '<i style="display: block;position: absolute;left: 24px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 29 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.8) + '"></i>' +
            '<i style="display: block;position: absolute;left: 28px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 32 * vol / 100 + 'px;opacity:' + (vol / 100 + 1) + '"></i>' +
            '</span>' +
            '<span style="display: block;position:relative;width: 30px;height: 32px;">' +
            '<i style="display: block;position: absolute;left: 0;top: 0;width: 2px;background: #c5f0ff;height:' + 11 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.4) + '"></i>' +
            '<i style="display: block;position: absolute;left: 4px;top: 0;width: 2px;background: #c5f0ff;height:' + 14 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 8px;top: 0;width: 2px;background: #c5f0ff;height:' + 17 * vol / 100 + 'px;opacity:' + (vol / 100 + 0) + '"></i>' +
            '<i style="display: block;position: absolute;left: 12px;top: 0;width: 2px;background: #c5f0ff;height:' + 20 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 16px;top: 0;width: 2px;background: #c5f0ff;height:' + 23 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.4) + '"></i>' +
            '<i style="display: block;position: absolute;left: 20px;top: 0;width: 2px;background: #c5f0ff;height:' + 26 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.6) + '"></i>' +
            '<i style="display: block;position: absolute;left: 24px;top: 0;width: 2px;background: #c5f0ff;height:' + 29 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.8) + '"></i>' +
            '<i style="display: block;position: absolute;left: 28px;top: 0;width: 2px;background: #c5f0ff;height:' + 32 * vol / 100 + 'px;opacity:' + (vol / 100 + 1) + '"></i>' +
            '</span>' +
            '</span>' +
            '<span style="display:block;margin:31px auto;width: 36px;height: 58px;" class="voluemImg"></span>' +
            '<span style="display: block;width: 30px;height: 65px;position: absolute;right: 9px;top:26px;">' +
            '<span style="display: block;position:relative;width: 30px;height: 32px;margin-bottom: 1px;">' +
            '<i style="display: block;position: absolute;left: 0;bottom: 0;width: 2px;background: #c5f0ff;height:' + 32 * vol / 100 + 'px;opacity:' + (vol / 100 + 1) + '"></i>' +
            '<i style="display: block;position: absolute;left: 4px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 29 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.8) + '"></i>' +
            '<i style="display: block;position: absolute;left: 8px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 26 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.6) + '"></i>' +
            '<i style="display: block;position: absolute;left: 12px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 23 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.4) + '"></i>' +
            '<i style="display: block;position: absolute;left: 16px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 20 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 20px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 17 * vol / 100 + 'px;opacity:' + (vol / 100 + 0) + '"></i>' +
            '<i style="display: block;position: absolute;left: 24px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 14 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 28px;bottom: 0;width: 2px;background: #c5f0ff;height:' + 11 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.4) + '"></i>' +
            '</span>' +
            '<span style="display: block;position:relative;width: 30px;height: 32px;">' +
            '<i style="display: block;position: absolute;left: 0;top: 0;width: 2px;background: #c5f0ff;height:' + 32 * vol / 100 + 'px;opacity:' + (vol / 100 + 1) + '"></i>' +
            '<i style="display: block;position: absolute;left: 4px;top: 0;width: 2px;background: #c5f0ff;height:' + 29 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.8) + '"></i>' +
            '<i style="display: block;position: absolute;left: 8px;top: 0;width: 2px;background: #c5f0ff;height:' + 26 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.6) + '"></i>' +
            '<i style="display: block;position: absolute;left: 12px;top: 0;width: 2px;background: #c5f0ff;height:' + 23 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.4) + '"></i>' +
            '<i style="display: block;position: absolute;left: 16px;top: 0;width: 2px;background: #c5f0ff;height:' + 20 * vol / 100 + 'px;opacity:' + (vol / 100 + 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 20px;top: 0;width: 2px;background: #c5f0ff;height:' + 17 * vol / 100 + 'px;opacity:' + (vol / 100 + 0) + '"></i>' +
            '<i style="display: block;position: absolute;left: 24px;top: 0;width: 2px;background: #c5f0ff;height:' + 14 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.2) + '"></i>' +
            '<i style="display: block;position: absolute;left: 28px;top: 0;width: 2px;background: #c5f0ff;height:' + 11 * vol / 100 + 'px;opacity:' + (vol / 100 - 0.4) + '"></i>' +
            '</span>' +
            '</span>' +
            '</div>';
    }
    return {
        volume: _volume
    };
})();