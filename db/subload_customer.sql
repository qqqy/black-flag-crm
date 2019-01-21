select * from interaction
join ticket on tick_id = inte_ticket
where tick_customer = $(id)