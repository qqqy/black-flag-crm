select * from interaction
where inte_ticket = $(id)
ORDER BY inte_id DESC
limit 20