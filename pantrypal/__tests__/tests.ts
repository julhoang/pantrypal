import createEntry from './../pages/create';
import deleteEntry from './../pages/delete';

import {describe, expect, test} from '@jest/globals';

test('should create new user ', async () => {

  await expect(createEntry('Mango','1','hello','Fruit')).resolves.toEqual(
    "Mango"
  )
})

test('should delete the item',async () => {
  
  await expect(deleteEntry('Mango')).resolves.toEqual(
    "Mango"
  )
})