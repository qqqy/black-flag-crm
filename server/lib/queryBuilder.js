module.exports = {
queryBuilder(togglesOb = false , term = ''){
let queryArray = [
  'select ' , 
  'inte_title , agent_name , agent_id , cust_name , cust_id , tick_id , flag_id , inte_date ' ,
  '* ' ,
  'from interaction i join ticket t on i.inte_ticket = t.tick_id join customer c on c.cust_id = t.tick_customer join agent a on a.agent_id = i.inte_agent left join task tk on tk.task_id = i.inte_task join flag f on f.flag_id = i.inte_flag where ' ,
  'cust_name ilike \$\(strTerm\) ' , 
  'or ' ,
  'agent_name ilike \$\(strTerm\) ' , 
  'or ' ,
  'tick_title ilike \$\(strTerm\) ' , 
  'or ' ,
  'task_body ilike \$\(strTerm\) ' , 
  'or ' ,
  'cust_email ilike \$\(strTerm\) ' , 
  'or ' ,
  'agent_email ilike \$\(strTerm\) ' , 
  'or ' ,
  'flag_name ilike \$\(strTerm\) ' , 
  'or ' ,
  'inte_title ilike \$\(strTerm\) ' , 
  'or ' ,
  'inte_body ilike \$\(strTerm\) ' , 
  'OR ' ,
  'cust_id = \$\(intTerm\) ' , 
  'OR ' ,
  'tick_id = \$\(intTerm\) ' , 
  'OR ' ,
  'flag_id = \$\(intTerm\) ' , 
  'AND ' ,
  'agent_id = \$\(agent_id\) ' , 
  'AND ' ,
  'task_is_resolved = false ' ,
  'LIMIT 10 OFFSET \$\(batch\) ']

  
  
  const queryToggles = [
    // SELECT //
    true ,
    // COLUMN SELECTIONS //
    // BASE SEARCH //
    true ,
    // * //
    false ,
    // JOINS //
    true ,
    // TERM SEARCHES //
    // CUST_NAME [4] //
    true ,
    // AGENT_NAME [5] //
    true ,
    true ,
    // TICK_TITLE [7] //
    true ,
    true ,
    // TASK_BODY [9] //
    true ,
    true ,
    // CUST_EMAIL [11] //
    true ,
    true ,
    // AGENT_EMAIL [13] //
    true ,
    true ,
    // FLAG_NAME [15] //
    true ,
    true ,
    // INTE_TITLE [17] //
    true ,
    true ,
    // INTE_BODY [19] //
    true ,
    true ,
    // INT SEARCHES [21] //
    // CUST_ID [21] //
    false ,
    false ,
    // TICK_ID [23] //
    false ,
    false ,
    // FLAG_ID [25] //
    false ,
    false ,
    // AGENT_ID LIMITER [27] //
    false ,
    false ,
    // TASK_IS_RESOLVED LIMITER [29] //
    false ,
    false ,
    // LIMIT AND OFFSET //
    true ,
  ]

  function toggler(togglesOb){
    let togglesEdit = queryToggles.slice()
    if(!togglesOb){return queryToggles}
    switch (true){
      case togglesOb.splat:
        togglesEdit.splice(1 , 2 , false , true);
      case togglesOb.byCustomer:
        togglesEdit.splice(5 , 6 , false , false , false , false , false , false)
        togglesEdit.splice(13 , 10 , false , false , false , false , false , false , false , false , true , true)
      case togglesOb.byTicket:
        togglesEdit.splice(4 , 3 , false , false , false)
        togglesEdit.splice(9 , 16 , false , false , false , false , false , false , false , false , false , false , false , false , false , false , true , true)
      case togglesOb.byFlag:
        togglesEdit.splice(4 , 11 , false , false , false , false , false , false , false , false , false , false , false)
        togglesEdit.splice(17 , 4 , false , false , false , false)
        togglesEdit.splice(25 , 2 , true , true)
      case togglesOb.limitAgent:
        togglesEdit.splice(27 , 2 , true , true)
      case togglesOb.limitActive:
        togglesEdit.splice(29 , 2 , true , true)
    }
    return togglesEdit
  }
  
  function queryStringBuilder(toggles = queryToggles){
  let queryString = ''
   for(let i=0; i < queryArray.length; i++){
     if(toggles[i]){queryString = queryString + queryArray[i]}
   }
   return queryString
  }

  return queryStringBuilder(toggler(togglesOb))
}
}