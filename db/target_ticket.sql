select * from ticket
join customer on cust_id = tick_customer
join agent on agent_id = tick_agent
where tick_id = $(id)