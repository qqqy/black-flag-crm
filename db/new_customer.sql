INSERT INTO customer (cust_name , cust_email , cust_phone , cust_ip)
VALUES ($(cust_name) , $(cust_email) , $(cust_phone) , $(cust_ip))
returning *