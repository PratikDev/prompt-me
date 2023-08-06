import { Card } from "@/components/Card";
import { Input } from "@/components/ui/input";
import { postedAt, prompt, tags, username } from "@/test-data/faker-data";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 xs:gap-16">
        <div className="text-4xl xs:text-5xl md:text-7xl font-extrabold text-center">
          <h1 className="text-stone-800 dark:text-gray-100">
            Explore and Share
          </h1>

          <h1
            style={{ WebkitTextFillColor: `transparent` }}
            className="mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          >
            AI-Enhanced Prompts
          </h1>
        </div>

        <Input
          type="text"
          className={`md:w-4/5 shadow-md px-5 h-12 dark:bg-gray-900/25 focus:dark:bg-gray-900/50 placeholder:font-extralight`}
          placeholder="Search for any prompt or tag..."
        />

        <section style={{ columnWidth: 320 }} className={`columns-4 gap-x-3`}>
          {Array.from({ length: 20 }).map((_, index) => (
            <Card
              key={index}
              user={username()}
              prompt={prompt()}
              tags={tags()}
              postedAt={postedAt()}
            />
          ))}
        </section>
      </div>
    </>
  );
}
