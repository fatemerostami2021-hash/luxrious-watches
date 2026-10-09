CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,name TEXT,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,role TEXT DEFAULT 'user',created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY,slug TEXT UNIQUE NOT NULL,name TEXT,name_fa TEXT,description TEXT,description_fa TEXT,price NUMERIC NOT NULL,stock INT DEFAULT 10,image TEXT);
CREATE TABLE IF NOT EXISTS orders(id SERIAL PRIMARY KEY,user_id INT REFERENCES users(id),email TEXT,address TEXT,items JSONB,total NUMERIC,status TEXT DEFAULT 'pending',created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS posts(id SERIAL PRIMARY KEY,slug TEXT UNIQUE,title TEXT,title_fa TEXT,body TEXT,body_fa TEXT,created_at TIMESTAMPTZ DEFAULT now());
INSERT INTO products(slug,name,name_fa,description,description_fa,price) VALUES
('aurel','VÉRION AUREL','ورینون اورل','Rose gold, ivory dial.','بدنه رزگلد با صفحه عاجی.',4900),
('noir','VÉRION NOIR','ورینون نوار','Steel and obsidian.','استیل و صفحه سیاه.',5200),
('chrono','VÉRION CHRONO','ورینون کرونو','Titanium chronograph.','کرونوگراف تیتانیوم.',6400),
('seriex','VÉRION SÉRIE X','ورینون سری ایکس','Skeleton movement.','موومنت اسکلتون.',7800) ON CONFLICT DO NOTHING;
INSERT INTO posts(slug,title,title_fa,body,body_fa) VALUES
('welcome','Inside the movement','درون موومنت','How a mechanical watch keeps time.','ساعت مکانیکی چگونه زمان را نگه می‌دارد.') ON CONFLICT DO NOTHING;
