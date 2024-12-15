import { readdirSync } from 'fs';

import Gallery from './components/Gallery';
import NavBar from './components/Navbar';

export default function Home() {
  const urlPath = '/media';
  const filenameList = readdirSync(process.cwd() + '/public/media').filter(
    (filename) => filename !== '.gitkeep'
  );

  const images = filenameList.map((filename) => ({
    src: `${urlPath}/${filename}`,
  }));

  return (
    <div className="flex flex-col items-start relative sm:flex-row p-6">
      <NavBar />
      <Gallery images={images} />
    </div>
  );
}
