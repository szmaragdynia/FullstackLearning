const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  expect(reverse('a')).toBe('a')
})

test('reverse of react', () => {
  expect(reverse('react')).toBe('tcaer')
})

/*test('palindrome of react', () => {
  expect(reverse('react')).toBe('tkaer')
}) */

test('reverse of releveler', () => {
  expect(reverse('releveler')).toBe('releveler')
})