import UploadIcon from './icons/UploadIcon'

export default function ImageUpload({ className }: { className: string }) {
   return (
      <div className='absolute inset-0'>
         <label
            htmlFor='file'
            className='w-full h-full flex justify-center items-center cursor-pointer'
         >
            <UploadIcon className={className} />
         </label>
         <input id='file' type='file' className='hidden' />
      </div>
   )
}
