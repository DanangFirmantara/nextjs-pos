task yang harus dijalankan setelah update code.
1. update CHANGELOG.md.

ddl yang baru ditambahkan

-- public.master_menu definition

-- Drop table

-- DROP TABLE public.master_menu;

CREATE TABLE public.master_menu (
	id serial4 NOT NULL,
	guid uuid DEFAULT uuid_generate_v4() NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_by int4 NULL,
	updated_at timestamp NULL,
	updated_by int4 NULL,
	vname varchar(150) NOT NULL,
	vdesc varchar(255) NULL,
	ikategory int4 NULL,
	kode_barang varchar(50) NULL,
	ijenis_satuan int4 NULL,
	harga_jual int8 DEFAULT 0 NOT NULL,
	harga_beli int8 DEFAULT 0 NULL,
	istock int4 DEFAULT 0 NULL,
	imin_stock int4 DEFAULT 0 NULL,
	file_name varchar(255) NULL,
	file_type varchar(100) NULL,
	file_path varchar(500) NULL,
	bis_delete bool DEFAULT false NULL,
	bis_active bool DEFAULT true NULL,
	CONSTRAINT master_menu_pkey PRIMARY KEY (id),
	CONSTRAINT fk_master_menu_ijenis_satuan FOREIGN KEY (ijenis_satuan) REFERENCES public.master_referensi(id) ON DELETE CASCADE,
	CONSTRAINT fk_master_menu_ikategory FOREIGN KEY (ikategory) REFERENCES public.master_referensi(id) ON DELETE CASCADE
);

-- public.trx_menu definition

-- Drop table

-- DROP TABLE public.trx_menu;

CREATE TABLE public.trx_menu (
	id serial4 NOT NULL,
	guid uuid DEFAULT uuid_generate_v4() NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_by int4 NULL,
	updated_at timestamp NULL,
	updated_by int4 NULL,
	vno_transaksi varchar(100) NOT NULL,
	dtgl_transaksi timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	itotal_item int4 DEFAULT 0 NULL,
	total_transaksi int8 DEFAULT 0 NULL,
	imetode_pembayaran int4 NULL,
	ipic int4 NULL,
	bis_delete bool DEFAULT false NULL,
	bis_active bool DEFAULT true NULL,
	CONSTRAINT trx_menu_pkey PRIMARY KEY (id),
	CONSTRAINT fk_trx_menu_imetode_pembayaran FOREIGN KEY (imetode_pembayaran) REFERENCES public.master_referensi(id) ON DELETE CASCADE,
	CONSTRAINT fk_trx_menu_ipic FOREIGN KEY (ipic) REFERENCES public.users(id) ON DELETE CASCADE
);

-- public.trx_menu_detail definition

-- Drop table

-- DROP TABLE public.trx_menu_detail;

CREATE TABLE public.trx_menu_detail (
	id serial4 NOT NULL,
	guid uuid DEFAULT uuid_generate_v4() NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_by int4 NULL,
	updated_at timestamp NULL,
	updated_by int4 NULL,
	id_trx_menu int4 NOT NULL,
	imenu_id int4 NOT NULL,
	qty int4 DEFAULT 1 NOT NULL,
	total_transaksi int8 DEFAULT 0 NOT NULL,
	bis_delete bool DEFAULT false NULL,
	bis_active bool DEFAULT true NULL,
	CONSTRAINT trx_menu_detail_pkey PRIMARY KEY (id),
	CONSTRAINT fk_trx_menu_detail_id_trx_menu FOREIGN KEY (id_trx_menu) REFERENCES public.trx_menu(id) ON DELETE CASCADE
);

-- public.trx_pengeluaran definition

-- Drop table

-- DROP TABLE public.trx_pengeluaran;

CREATE TABLE public.trx_pengeluaran (
	id serial4 NOT NULL,
	guid uuid DEFAULT uuid_generate_v4() NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_by int4 NULL,
	updated_at timestamp NULL,
	updated_by int4 NULL,
	dtgl_pengeluaran timestamp NULL,
	ikategory int4 NULL,
	vdesc varchar(255) NULL,
	total_pengeluaran int8 DEFAULT 0 NOT NULL,
	ipic int4 NULL,
	bis_delete bool DEFAULT false NULL,
	bis_active bool DEFAULT true NULL,
	CONSTRAINT trx_pengeluaran_pkey PRIMARY KEY (id),
	CONSTRAINT fk_trx_pengeluaran_ikategory FOREIGN KEY (ikategory) REFERENCES public.master_referensi(id) ON DELETE CASCADE,
	CONSTRAINT fk_trx_pengeluaran_ipic FOREIGN KEY (ipic) REFERENCES public.users(id) ON DELETE CASCADE
);