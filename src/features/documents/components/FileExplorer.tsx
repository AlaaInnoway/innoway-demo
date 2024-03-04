import { useEffect, useState } from 'react';
import documents from '../data/documents';
import FileCard from './FileCard';
import FolderCard from './FolderCard';

function FileExplorer() {
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
  const handleFolderClick = (folder: {
    id: number;
    name: string;
    type: string;
    parentId?: number;
    parent?: any;
  }) => {
    setSelectedFolder(folder.id);
  };

  const handleBackClick = () => {
    setSelectedFolder(null);
  };
  useEffect(() => {
    if (!selectedFolder) {
      setFilteredFiles(documents.filter((file: any) => !file.parent?.id));
    }
    if (selectedFolder) {
      setFilteredFiles(
        documents.filter((file) => file.parent?.id === selectedFolder)
      );
    }
  }, [selectedFolder]);

  return (
    <div>
      {selectedFolder && (
        <div>
          <button
            className="text-blue-500 hover:underline"
            onClick={handleBackClick}
            type="button"
          >
            Back
          </button>
          <span className="mx-2">&gt;</span>
          {documents
            .filter((file) => file.id === selectedFolder)
            .map((folder) => folder.name)}
        </div>
      )}
      <div className="grid grid-cols-8 gap-4">
        {filteredFiles?.map((file: any) =>
          file.type ? (
            <FileCard key={file.id} file={file} enabled />
          ) : (
            <FolderCard
              key={file.id}
              folder={file}
              enabled
              handleClick={() => handleFolderClick(file)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default FileExplorer;
