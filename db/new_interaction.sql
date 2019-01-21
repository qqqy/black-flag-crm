insert into interaction (inte_flag , inte_ticket , inte_task , inte_agent , inte_body , inte_title)
values ($(inte_flag) , $(inte_ticket) , $(inte_task) , $(inte_agent) , $(inte_body) , $(inte_title))
returning *