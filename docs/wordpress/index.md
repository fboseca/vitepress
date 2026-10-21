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

Relaciones entre usuarios y pedidos

```sql
-- relaciones entre usuarios y pedidos
SELECT
    o.id AS order_id,
    o.date_created_gmt AS order_date,
    o.status AS order_status,
    o.customer_id AS user_id,
    u.user_email,
    u.user_login,
    oi.order_item_name AS product_name,
    qty.meta_value AS quantity,
    line_total.meta_value AS line_total,
    (line_total.meta_value / qty.meta_value) AS unit_price,
    sku.meta_value AS product_sku
FROM wp_wc_orders o
LEFT JOIN wp_users u ON u.ID = o.customer_id
LEFT JOIN wp_woocommerce_order_items oi
ON oi.order_id = o.id AND oi.order_item_type = 'line_item'
LEFT JOIN wp_woocommerce_order_itemmeta qty
ON qty.order_item_id = oi.order_item_id AND qty.meta_key = '_qty'
LEFT JOIN wp_woocommerce_order_itemmeta line_total
    ON line_total.order_item_id = oi.order_item_id
    AND line_total.meta_key = '_line_total'
LEFT JOIN wp_woocommerce_order_itemmeta product_id_meta
    ON product_id_meta.order_item_id = oi.order_item_id
    AND product_id_meta.meta_key = '_product_id'
LEFT JOIN wp_postmeta sku
    ON sku.post_id = product_id_meta.meta_value
    AND sku.meta_key = '_sku'
ORDER BY o.id DESC;
```

Busquedas entre usuarios y pedidos

```sql

-- usuarios sin pedidos con email raro
SELECT
distinct(u.user_email)
from wp_users u
left join wp_wc_orders wwo on wwo.customer_id =u.ID
where wwo.id is null
and u.user_email not like '%@gmail.com'
and u.user_email not like '%@hotmail.com';

-- usuarios con pedidos
SELECT
distinct(u.user_email)
from wp_users u
left join wp_wc_orders wwo on wwo.customer_id =u.ID
where wwo.id is not null;


-- usuarios fraudulentos con ralaciones
select
u.user_email ,
wm.meta_key ,
wm.meta_value ,
wwcl.username as lookup,
wp.post_title as posts,
wc.comment_author as comments
from wp_users u
left join wp_usermeta wm on u.ID = wm.user_id
left join wp_wc_customer_lookup wwcl on wwcl.user_id = u.ID
left join wp_posts wp on u.ID = wp.post_author
left join wp_comments wc on wc.user_id = u.ID
where u.ID in (
	SELECT
	distinct(wu.ID)
	from wp_users wu
	left join wp_wc_orders wwo on wwo.customer_id =wu.ID
	where wwo.id is null
	and wu.user_email not like '%@gmail.com'
	and wu.user_email not like '%@hotmail.com'
)


-- usuarios fraudulentos con relaciones post
SELECT p.ID, p.post_title, pm.meta_key, pm.meta_value
FROM wp_posts p
LEFT JOIN wp_postmeta pm ON pm.post_id = p.ID
where p.post_author in (
	SELECT
	distinct(wu.ID)
	from wp_users wu
	left join wp_wc_orders wwo on wwo.customer_id =wu.ID
	where wwo.id is null
	and wu.user_email not like '%@gmail.com'
	and wu.user_email not like '%@hotmail.com'
)


-- usuarios fraudulentos con ralaciones en comentarios
SELECT c.comment_ID, c.comment_content, cm.meta_key, cm.meta_value
FROM wp_comments c
LEFT JOIN wp_commentmeta cm ON cm.comment_id = c.comment_ID
where c.user_id in (
	SELECT
	distinct(wu.ID)
	from wp_users wu
	left join wp_wc_orders wwo on wwo.customer_id =wu.ID
	where wwo.id is null
	and wu.user_email not like '%@gmail.com'
	and wu.user_email not like '%@hotmail.com'
);

```

Borrados entre usuarios y pedidos

```sql
-- 1. Commentmeta
DELETE cm
FROM wp_commentmeta cm
INNER JOIN wp_comments c ON c.comment_ID = cm.comment_id
WHERE c.user_id in (
	SELECT
	distinct(u.ID)
	from wp_users u
	left join wp_wc_orders wwo on wwo.customer_id =u.ID
	where wwo.id is null
	and u.user_email not like '%@gmail.com'
	and u.user_email not like '%@hotmail.com'
);

-- 2. Comments
DELETE FROM wp_comments c WHERE c.user_id in (
	SELECT
	distinct(u.ID)
	from wp_users u
	left join wp_wc_orders wwo on wwo.customer_id =u.ID
	where wwo.id is null
	and u.user_email not like '%@gmail.com'
	and u.user_email not like '%@hotmail.com'
);

-- 3. Postmeta
DELETE pm
FROM wp_postmeta pm
INNER JOIN wp_posts p ON p.ID = pm.post_id
WHERE p.post_author in (
	SELECT
	distinct(u.ID)
	from wp_users u
	left join wp_wc_orders wwo on wwo.customer_id =u.ID
	where wwo.id is null
	and u.user_email not like '%@gmail.com'
	and u.user_email not like '%@hotmail.com'
);

-- 4. Posts
DELETE FROM wp_posts p WHERE p.post_author in (
	SELECT
	distinct(u.ID)
	from wp_users u
	left join wp_wc_orders wwo on wwo.customer_id =u.ID
	where wwo.id is null
	and u.user_email not like '%@gmail.com'
	and u.user_email not like '%@hotmail.com'
);


-- 5. Look up
DELETE FROM wp_wc_customer_lookup wl where wl.user_id in (
	SELECT
	distinct(u.ID)
	from wp_users u
	left join wp_wc_orders wwo on wwo.customer_id =u.ID
	where wwo.id is null
	and u.user_email not like '%@gmail.com'
	and u.user_email not like '%@hotmail.com'
);


-- 6. user meta
DELETE FROM wp_usermeta m where m.user_id in (
	SELECT
	distinct(u.ID)
	from wp_users u
	left join wp_wc_orders wwo on wwo.customer_id =u.ID
	where wwo.id is null
	and u.user_email not like '%@gmail.com'
	and u.user_email not like '%@hotmail.com'
);


-- 7. users
DELETE from wp_users wu where wu.ID in (
	SELECT
	distinct(u.ID)
	from wp_users u
	left join wp_wc_orders wwo on wwo.customer_id =u.ID
	where wwo.id is null
	and u.user_email not like '%@gmail.com'
	and u.user_email not like '%@hotmail.com'
);
```
