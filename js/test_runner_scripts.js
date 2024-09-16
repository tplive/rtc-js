// *** RUN TESTS, DISPLAY RESULTS

function runTest(domId, callback) {
  
  // Get list and create a new list item
  const ul = document.getElementById(domId)
  const li = document.createElement("li")
  
  // Create placeholder inside list item
  const li_text = document.createElement("span")
  li_text.innerHTML = "Running " + callback.name + "(): "
  
  // Append list item to list
  ul.appendChild(li);
  // Append span to list item
  li.appendChild(li_text)
  
  // Run test
  var result = callback()
  
  const li_result = document.createElement("span")
  li.appendChild(li_result)
  var text = (result) ? "Test Passed!":"Test Failed!"
  var color = (result) ? "green":"red"
  li_result.innerHTML = text
  li_result.style.color = color

}

runTest("test_list", test_tuple_function)
runTest("test_list", test_vector_function)
runTest("test_list", test_point_function)
runTest("test_list", test_equal_function)
runTest("test_list", test_equal_tuples_function)
runTest("test_list", test_add_tuples_function)

