task yang harus dijalankan setelah update code.
1. update CHANGELOG.md.

ddl yang baru ditambahkan

-- public.master_referensi definition

-- Drop table

-- DROP TABLE public.master_referensi;

CREATE TABLE public.master_referensi (
	id serial4 NOT NULL,
	guid uuid DEFAULT uuid_generate_v4() NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_by int4 NULL,
	updated_at timestamp NULL,
	updated_by int4 NULL,
	vname varchar(100) NOT NULL,
	vdesc varchar(255) NULL,
	bis_delete bool DEFAULT false NULL,
	CONSTRAINT master_referensi_pkey PRIMARY KEY (id)
);