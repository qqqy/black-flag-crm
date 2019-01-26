select * from interaction
join ticket on tick_id = inte_ticket
join customer on cust_id = tick_customer
join agent on agent_id = inte_agent
where inte_id = $(id)