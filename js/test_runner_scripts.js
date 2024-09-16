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
runTest("test_list", test_subtract_tuples_function)
runTest("test_list", test_negate_tuple_function)
runTest("test_list", test_multiply_vector_function)
runTest("test_list", test_divide_vector_function)
runTest("test_list", test_magnitude_function)
runTest("test_list", test_normalize_function)
runTest("test_list", test_dot_function)
runTest("test_list", test_cross_function)

runTest("colors_list", test_color_function)
runTest("colors_list", test_add_colors_function)
runTest("colors_list", test_subtract_colors_function)
runTest("colors_list", test_multiply_color_function)
runTest("colors_list", test_multiply_colors_function)

runTest("canvas_list", test_canvas_function)
runTest("canvas_list", test_write_pixel_function)
runTest("canvas_list", test_catch_canvas_out_of_bounds)
runTest("canvas_list", test_canvas_to_ppm_function)
