import { Card } from 'antd';
import { BookProps } from 'src/features/books/books-reducer';

const { Meta } = Card;

export default function BooksCard(data: BookProps) {
  return (
    <Card hoverable style={{ width: '100%' }} cover={<img alt="example" src={data.img} />}>
      <Meta title={data.title} description={`Author: ${data.author}`} />
    </Card>
  );
}
