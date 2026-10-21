# Wordpress

## Consultas generales de wordpress

Para modificar la url inicial cuando se migra un servidor

```sql
UPDATE wp_options SET option_value = 'http://localhost' WHERE option_name = 'siteurl';
UPDATE wp_options SET option_value = 'http://localhost' WHERE option_name = 'home';

UPDATE wp_posts SET guid = REPLACE(guid, 'http://tu-dominio.com', 'http://localhost');
UPDATE wp_posts SET post_content = REPLACE(post_content, 'http://tu-dominio.com', 'http://localhost');

UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'http://tu-dominio.com', 'http://localhost');
```

Para ver la información de las imágenes

```sql
SELECT wp.id, post_title,wpm.*  FROM wp_posts AS wp
left JOIN wp_postmeta AS wpm ON wp.ID = wpm.post_id
WHERE wp.post_type IN ('attachment')
ORDER BY wp.id DESC;
```

Para cambiar el alt de las imágenes por su nombre.

```sql
UPDATE wp_postmeta AS wpm JOIN wp_posts AS wp ON wp.ID = wpm.post_id
SET wpm.meta_value = wp.post_title
WHERE wpm.meta_key='_wp_attachment_image_alt'
AND (wpm.meta_value='' OR wpm.meta_value IS NULL)
```

## Consultas sql para woocommerce

Para cambiar un trozo de la descripción de un producto.

```sql
UPDATE wp_posts
SET post_excerpt = CONCAT(SUBSTRING_INDEX(post_excerpt, '¿Tienes prisa?', 1), '<br> [sc name="descripcion_final_del_producto"][/sc]')
WHERE post_excerpt LIKE '%¿Tienes prisa?%'
AND post_type = 'product';

```

Para recoger información de los productos

```sql
#los tipos de posts
SELECT distinct(post_type) FROM wp_posts;

#informacion de los cupones
SELECT wp.id, post_title,wpm.*  FROM wp_posts AS wp
left JOIN wp_postmeta AS wpm ON wp.ID = wpm.post_id
WHERE wp.post_type IN ('shop_coupon')
ORDER BY wp.id DESC;

#informacion de los productos y variaciones
SELECT wp.id, post_title,wpm.*  FROM wp_posts AS wp
left JOIN wp_postmeta AS wpm ON wp.ID = wpm.post_id
WHERE wp.post_type IN ('product','product_variation')
AND wp.id = 4893
ORDER BY wp.id DESC;
```
