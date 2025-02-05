import youtube_icon from '../assets/youtube_icon.png'
import twitter_icon from '../assets/twitter_icon.png'
import instagram_icon from '../assets/instagram_icon.png'
import facebook_icon from '../assets/facebook_icon.png'


const Footer = () => {
  return(
    <div className=" p-[30px px-[4%] max-w-5xl m-0 mx-auto">
      <div className=" flex gap-5 m-[40px] ">
        <img  className="w-8 cursor-pointer" src={facebook_icon} alt="" />
        <img className="w-8 cursor-pointer" src={instagram_icon} alt="" />
        <img className="w-8 cursor-pointer" src={twitter_icon} alt="" />
        <img className="w-8 cursor-pointer" src={youtube_icon} alt="" />
      </div>

      <ul className='grid grid-cols-4 gap-4 mb-[30px] list-none'>
        <li className='cursor-pointer hover:underline'>FAQ</li>
        <li className='cursor-pointer hover:underline'>Audio Description</li>
        <li className='cursor-pointer hover:underline'>Help Centre</li>
        <li className='cursor-pointer hover:underline'>Gift Cards</li>
        <li className='cursor-pointer hover:underline'>Media Centre</li>
        <li className='cursor-pointer hover:underline'>Investor Relations</li>
        <li className='cursor-pointer hover:underline'>Jobs</li>
        <li className='cursor-pointer hover:underline'>Ways to Watch</li>
        <li className='cursor-pointer hover:underline'>Terms of use</li>
        <li className='cursor-pointer hover:underline'>Privacy</li>
        <li className='cursor-pointer hover:underline'>Cookie Preferences</li>
        <li className='cursor-pointer hover:underline'>Corporate Information</li>
        <li className='cursor-pointer hover:underline'>Contact Us</li>
        <li className='cursor-pointer hover:underline'>Speed Test</li>
        <li className='cursor-pointer hover:underline'>Legal Notices</li>
        <li className='cursor-pointer hover:underline'>Only on Netflix</li>
      </ul>

      <p className='text-gray-500 text-sm'>Netflix India</p>
    </div>
  )
}


export default Footer