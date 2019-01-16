select inte_title , agent_name , agent_id , cust_name , cust_id , tick_id , flag_id , inte_date from interaction i
join ticket t on t.tick_id = i.inte_ticket
join customer c on t.tick_customer = c.cust_id
join agent a on i.inte_agent = a.agent_id
join flag f on f.flag_id = i.inte_flag
order by inte_date desc
limit 10