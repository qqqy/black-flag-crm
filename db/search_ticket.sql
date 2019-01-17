select * from interaction i
join ticket t on i.inte_ticket = t.tick_id
join customer c on c.cust_id = t.tick_customer
join agent a on a.agent_id = i.inte_agent
left join task tk on tk.task_id = i.inte_task
join flag f on f.flag_id = i.inte_flag
where tick_title ilike $(fullTerm)
limit 10