select * from interaction i
join ticket t on i.inte_ticket = t.tick_id
join customer c on c.cust_id = t.tick_customer
join agent a on a.agent_id = i.inte_agent
left join task tk on tk.task_id = i.inte_task
join flag f on f.flag_id = i.inte_flag
where cust_name ilike $(fullTerm)
or agent_name ilike $(fullTerm)
or tick_title ilike $(fullTerm)
or task_body ilike $(fullTerm)
or cust_email ilike $(fullTerm)
or agent_email ilike $(fullTerm)
or flag_name ilike $(fullTerm)
or inte_title ilike $(fullTerm)
or inte_body ilike $(fullTerm)
limit 10