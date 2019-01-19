UPDATE interaction
SET (inte_id , inte_flag , inte_date , inte_ticket , inte_task , inte_agent , inte_body , inte_title , inte_active , inte_is_pinned) = ($(inte_id) , $(inte_flag) , $(inte_date) , $(inte_ticket) , $(inte_task) , $(inte_agent) , $(inte_body) , $(inte_title) , $(inte_active) , $(inte_is_pinned))
WHERE inte_id = $(inte_id)
RETURNING *