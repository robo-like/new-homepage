import { Header } from './Header';
import logoDark from './heart.png';
import { AnimatedText } from './AnimatedText';
import { useState } from 'react';
import { Accordion } from './Accordion';

export function Welcome() {
  const [openSection, setOpenSection] = useState(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? -1 : index);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Header />
      <section className="flex justify-center items-center w-full md:py-10 max-w-[1300px] mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center md:px-4 pt-10">
          <div className="w-full md:flex-[3] px-4 md:pr-4 mb-4 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">Welcome to the new RoboLike</h1>
            <p className="text-lg">
              Discover the power of automation with RoboLike. 
              Reach your fans, audience, and customers effortlessly.
            </p>
          </div>
          <div className="w-full md:flex-1 flex justify-center pt-5">
            <img
              src={logoDark}
              alt="RoboLike Heart Logo"
              className="w-[150px] animate-float"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center w-full py-10">
        <AnimatedText />
        <div className="max-w-[850px] flex flex-col md:flex-row gap-6 w-full px-4">
          <div className="flex-1">
            <h1 className='text-8xl mb-5 font-serif'>1</h1>
            <h3 className="text-2xl font-bold mb-2">Download App</h3>
            <p className="text-lg">Download the app from our downloads page.</p>
          </div>
          <div className="flex-1">
            <h1 className='text-8xl mb-5 font-serif'>2</h1>
            <h3 className="text-2xl font-bold mb-2">Log Into Your Social Account</h3>
            <p className="text-lg">
              Follow on-screen steps to authorize the API to get recent posts.
            </p>
          </div>
          <div className="flex-1">
            <h1 className='text-8xl mb-5 font-serif'>3</h1>
            
            <h3 className="text-2xl font-bold mb-2">Select Tags</h3>
            <p className="text-lg">
              Monitor the usage and make sure it's relevant to your profile.
            </p>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center w-full py-10">
        <div className="max-w-[850px] w-full px-4">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-lg">
            If you think about how it feels to have someone "like" a post you publish, 
            you might conjure images of dopamine, success, and connection. Since the 
            dawn of social media, we've been spending our days liking this and that. 
            However, not many people know that liking posts is an evil genius way to 
            get other people to come to your content. RoboLike makes that process 
            automated so you can reach more people than you would have just doing that 
            on your own.
          </p>
        </div>
      </section>

      <section className="flex justify-center items-center w-full py-10">
        <div className="max-w-[850px] w-full px-4">
          <Accordion faqData={faqData} />
        </div>
      </section>

      <footer className="w-full bg-darkPurple text-white py-6 mt-10 glow-div">
        <div className="max-w-[850px] w-full px-4">
          <p className="text-md">© {currentYear} RoboLike. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

const faqData = [
  {
    question: "What's changed?",
    answer: "The new RoboLike is no longer powered in the cloud. It runs on your machine."
  },
  {
    question: "Do I need to keep my computer on?",
    answer: "Yes, you are in charge of the new RoboLike which means if your computer is asleep your bot is not engaging."
  },
  {
    question: "Why?",
    answer: "Well, using your naturally sourced IP address is the best way to avoid detection because this is already how and where you're accessing your account from."
  },
  {
    question: "Other benefits?",
    answer: "Because it's running entirely on your machine, there is no centralized place where your account can get hijacked. It's your account and your machine."
  },
  {
    question: "I'm not seeing any likes come through.",
    answer: "This could be because there are not enough items in the given hashtag so it keeps finding things your account has already liked. Try changing up the tags. Also, check for errors in the RoboLike dashboard (the one that opens up when you run the app). This will help you with any debugging needs."
  }
];