--create extension if not exists "uuid-ossp";

--create table carts (
--	id uuid not null default uuid_generate_v4() primary key,
--	user_id uuid not null,
--	created_at timestamp default current_timestamp,
--	updated_at timestamp default NOW(),
--	status text not null
--);

--create table cart_items (
--	cart_id uuid not null references carts(id),
--	product_id uuid not null,
--	count integer not null default 0
--);

--insert into carts (id, user_id, status) values ('838af134-3cba-4931-12aa-11406ff111c5', 'e8b85028-6e8e-44b2-bbf4-752743edd42a', 'OPEN');
--insert into cart_items (cart_id, product_id, count) values ('838af134-3cba-4931-12aa-11406ff111c5', 'd1003e61-601b-4b7d-bd40-beeef964edba', 3);
--
--insert into carts (id, user_id, status) values ('7f48b51a-870e-4f08-bfdc-9386f242c830', '09faf952-1c2e-4c08-99ec-081dc9a953d8', 'ORDERED');
--insert into cart_items (cart_id, product_id, count) values ('7f48b51a-870e-4f08-bfdc-9386f242c830', '09faf952-1c2e-4c08-99ec-081dc9a953d8', 3);

--insert into carts (id, user_id, status) values ('7f48b51a-870e-4f08-bfdc-9386f242c831', '09faf952-1c2e-4c08-99ec-081dc9a953d8', 'OPEN');
--insert into cart_items (cart_id, product_id, count) values ('7f48b51a-870e-4f08-bfdc-9386f242c831', '09faf952-1c2e-4c08-99ec-081dc9a953d8', 4);

