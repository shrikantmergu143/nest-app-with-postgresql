SELECT * FROM employee WHERE salary = (
	SELECT MAX(salary) FROM employee WHERE
	salary < (SELECT MAX(salary) FROM employee)
);
-- -- SELECT DISTINCT salary FROM employee;

SELECT department, AVG(salary) AS avg_salary
FROM employee
GROUP BY department;
-- Add new Column in table
ALTER TABLE employee ADD COLUMN department VARCHAR(100) DEFAULT 'IT';

-- Order by
SELECT * FROM employee order by name DESC;

-- Group by
SELECT COUNT(name) AS counts, salary FROM employee GROUP BY (SALARY) ORDER BY SALARY;

-- Having Clauses
SELECT COUNT(name), salary
from employee
GROUP BY (SALARY)
HAVING COUNT(name)>1;


-- Joins

SELECT 
c.cust_name,
o.ord_date,
p.p_name,
p.price,
oi.quantity,
(oi.quantity*p.price) as total_price
FROM order_items oi
JOIN products p ON oi.p_id=p.p_id
JOIN orders o ON o.ord_id=oi.ord_id
JOIN customers c ON o.cust_id=c.cust_id ORDER BY o.ord_date DESC;

SELECT c.cust_name