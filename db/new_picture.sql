update agent
set agent_picture = $(key)
where agent_id = $(id)
returning *