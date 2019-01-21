insert into ticket (tick_agent , tick_customer , tick_title , tick_reference)
values ($(tick_agent) , $(tick_customer) , $(tick_title) , $(tick_reference))
returning *