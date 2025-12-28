psql -U postgres
\list

-- Connect
\c <db_name>

-- CREATE EXTENSION IF NOT EXISTS master_hr;
CREATE SCHEMA IF NOT EXISTS master_hr;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    uid UUID DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email TEXT NOT NULL,
    age SMALLINT,
    balance NUMERIC(10, 2),
    salary MONEY,
    in_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMP,
    roles TEXT[],
    metadata JSONB,
    ip INET,
    mac MACADDR,
    location POINT,
    preferences JSONB,
    document BYTEA
)

Records enserted
https://www.canva.com/design/DAGQjSCN04I/5E1IRUJHAxJyV0O5G36rnw/edit

1. Check Constraints
 create table vendor_products (
    id serial primary key,
    name varchar(100) not null,
    price numeric (10, 2) check (price > 0),
    stock int check (stock >= 0),
 );