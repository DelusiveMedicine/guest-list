import './style.scss';

import Read from './read';
import Create from './create';
import Delete from './delete';
import Update from './update';

const read = new Read(),
  create = new Create(read),
  deletion = new Delete(read),
  update = new Update(read);

read.getListItem();
