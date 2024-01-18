import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/products/products.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '@/app/lib/data';

export default async function ProductsPage({searchParams}) {
  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const {count, products} = await fetchProducts(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add"></Link>
        <button className={styles.addButton}>Add New</button>
      </div>
      <table className={styles.table}>
        <thead>
          <td>Title</td>
          <td>Description</td>
          <td>Price</td>
          {/* <td>Created At</td> */}
          <td>Stock</td>
          <td>Action</td>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product} >
                  <Image
                    src={product.img || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>{product.price}</td>
              {/* <td>13.01.2022</td> */}
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
