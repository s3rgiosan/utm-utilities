/*
 * Google Maps Grid Generator
 *
 * @version 1.0.0
 * @author  Sérgio Santos
 * @email   me@s3rgiosan.com
 * @url     http://s3rgiosan.com
 */

var UTMGrid = {
  defaultStrokeColor:   "#000",
  defaultFillColor:     "#FFF",

  gmaps: {

    /**
     * Google Maps grid
     * 
     * @params  {Object} map: Map
     * @params  {Object} utm: UTM starting coordinates
     * @params  {Number} dist: Distance between points
     * @params  {Number} cols: Number of grid columns
     * @params  {Number} rows: Number of grid rows 
     */
    grid: function(map, utm, dist, cols, rows) { 

      // UTM coordinates
      var easting =   utm.easting;
      var northing =  utm.northing;
      var zone =    utm.zone;

      for(r = 0; r < rows; r++) {
        for(c = 0; c < cols; c++) {

          // Calculate the northeast and southwest points
          var SW = UTMConverter.converter.utmToLatLon({
            easting:  easting + (dist * c),
            northing:   northing + (dist * r),
            zone: zone
          });
          var NE = UTMConverter.converter.utmToLatLon({
            easting:  easting + (dist * (c + 1)),
            northing:   northing + (dist * (r + 1)),
            zone: zone
          });
          
          var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(SW.lat, SW.lon), 
            new google.maps.LatLng(NE.lat, NE.lon));

          // Create a rectangle that represents a grid cell
          var cell = new google.maps.Rectangle();
          cell.setOptions({
            bounds: bounds,
            map: map,
            strokeColor: UTMGrid.defaultStrokeColor,
            strokeOpacity: 0.8,
            strokeWeight: 0.1,
            fillColor: UTMGrid.defaultFillColor,
            fillOpacity: 0.2
          });
        }
      }
    }
  }
}