var _util = require("zrender/lib/core/util");

var createHashMap = _util.createHashMap;

/**
 * @file Visual encoding for themeRiver view
 * @author  Deqing Li(annong035@gmail.com)
 */
function _default(ecModel) {
  ecModel.eachSeriesByType('themeRiver', function (seriesModel) {
    var data = seriesModel.getData();
    var rawData = seriesModel.getRawData();
    var colorList = seriesModel.get('color');
    var idxMap = createHashMap();
    data.each(function (idx) {
      idxMap.set(data.getRawIndex(idx), idx);
    });
    rawData.each(function (rawIndex) {
      var name = rawData.getName(rawIndex);
      var color = colorList[(seriesModel.nameMap.get(name) - 1) % colorList.length];
      rawData.setItemVisual(rawIndex, 'color', color);
      var idx = idxMap.get(rawIndex);

      if (idx != null) {
        data.setItemVisual(idx, 'color', color);
      }
    });
  });
}

module.exports = _default;