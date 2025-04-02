CREATE TABLE taskman (
	id SERIAL PRIMARY KEY,
	taskname VARCHAR NOT NULL,
	description VARCHAR,
	created_at timestamp(0) WITH TIME ZONE NOT NULL DEFAULT NOW(),
	priority TEXT NOT NULL,
	completed BOOLEAN NOT NULL
);
