ga('require', 'ecommerce');

// Transacción

ga('ecommerce:addTransaction', {
     'id': $unique_id,                     // Transaction ID. Required.
     'affiliation': 'CavasOnline',   // Affiliation or store name.
     'revenue': $precio_final,               // Grand Total.
     'shipping': $afecto_flete,                  // Shipping.
     'tax': $impuesto,                     // Tax.
     'currency': 'CLP'  // local currency code.

   });
   


// Añadir artículos

   ga('ecommerce:addItem', {
     'id': $unique_id,                     // Transaction ID. Required.
     'name': $nombre_articulo,    // Product name. Required.
     'sku': $cod_articulo,                 // SKU/code.
     'category': 'Party Toys',         // Category or variation.
     'price': $precio_venta,                 // Unit price.
     'quantity': $cantidad_articulo,                   // Quantity.
     'currency': 'CLP'  // local currency code.
   });
   

   ga('ecommerce:send');
