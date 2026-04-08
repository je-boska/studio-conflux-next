import { getProjects } from "@/sanity";
import { Header } from "@/components/Header";
import { ProjectGrid } from "@/components/ProjectGrid";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex-1 w-full max-w-[1920px] mx-auto">
      <Header />
      <div className="px-4 pb-12 sm:px-6 lg:px-8">
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
}
