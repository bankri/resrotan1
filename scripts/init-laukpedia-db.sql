-- LaukPedia Database Schema
-- Catering Website dengan MySQL

-- Table: categories (Kategori menu)
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: menus (Daftar menu makanan)
CREATE TABLE IF NOT EXISTS menus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  image VARCHAR(255),
  portion_size VARCHAR(50),
  is_available BOOLEAN DEFAULT true,
  rating DECIMAL(3,2),
  review_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Table: customers (Pelanggan)
CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: orders (Pesanan)
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id INT NOT NULL,
  total_price INT NOT NULL,
  status ENUM('pending', 'confirmed', 'processing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
  delivery_date DATE NOT NULL,
  delivery_time VARCHAR(50),
  special_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Table: order_items (Item dalam pesanan)
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  menu_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price_at_purchase INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE RESTRICT
);

-- Table: reviews (Review menu)
CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  menu_id INT NOT NULL,
  customer_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Table: promos (Promosi & diskon)
CREATE TABLE IF NOT EXISTS promos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(255),
  discount_type ENUM('percentage', 'fixed') NOT NULL,
  discount_value INT NOT NULL,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  max_usage INT,
  used_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk performa
CREATE INDEX idx_category_id ON menus(category_id);
CREATE INDEX idx_customer_id ON orders(customer_id);
CREATE INDEX idx_order_id ON order_items(order_id);
CREATE INDEX idx_menu_id ON order_items(menu_id);
CREATE INDEX idx_order_date ON orders(created_at);
CREATE INDEX idx_delivery_date ON orders(delivery_date);
CREATE INDEX idx_status ON orders(status);

-- Insert Sample Data
INSERT INTO categories (name, description, icon) VALUES
('Nasi', 'Berbagai pilihan nasi lezat', '🍚'),
('Lauk Pauk', 'Lauk protein utama', '🍗'),
('Sayuran', 'Sayuran segar & bergizi', '🥬'),
('Minuman', 'Minuman segar & nikmat', '🥤'),
('Dessert', 'Hidangan penutup istimewa', '🍰');

INSERT INTO menus (category_id, name, description, price, portion_size, rating, review_count) VALUES
(1, 'Nasi Kuning', 'Nasi kuning dengan rempah pilihan, harum dan lezat', 25000, '1 porsi', 4.8, 45),
(1, 'Nasi Goreng Istimewa', 'Nasi goreng dengan telur, udang, dan ayam', 35000, '1 porsi', 4.7, 38),
(2, 'Ayam Goreng Kraton', 'Ayam goreng renyah dengan bumbu rahasia', 45000, '2 ekor', 4.9, 52),
(2, 'Ikan Bakar Manado', 'Ikan bakar dengan sambal khas Manado', 55000, '1 ekor', 4.8, 28),
(3, 'Gado-Gado', 'Sayuran rebus dengan bumbu kacang kental', 20000, '1 porsi', 4.6, 35),
(3, 'Tumis Sayuran Segar', 'Campur sayuran tumis dengan bumbu gurih', 18000, '1 porsi', 4.5, 22),
(4, 'Es Teh Manis', 'Es teh segar dengan rasa manis pas', 8000, '1 gelas', 4.7, 15),
(5, 'Pudding Coklat', 'Pudding coklat lembut dengan topping', 15000, '1 porsi', 4.8, 18);
