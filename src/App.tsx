import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PipelineStageViewer } from './components/PipelineStageViewer';
import { ProjectManager } from './components/ProjectManager';
import { TemplateGenerator } from './components/TemplateGenerator';
import { ChecklistTracker } from './components/ChecklistTracker';
import { ResourceLibrary } from './components/ResourceLibrary';
import { NewProjectModal } from './components/NewProjectModal';
import { 
  PIPELINE_STAGES, 
  GLOBAL_CHECKLIST, 
  RESOURCE_LINKS, 
  INITIAL_PROJECTS 
} from './data/initialData';
import { UserProject, GlobalChecklistItem, ResourceLink } from './types/pipeline';

const LOCAL_STORAGE_KEY_PROJECTS = 'ai_pipeline_projects_v1';
const LOCAL_STORAGE_KEY_CHECKLIST = 'ai_pipeline_checklist_v1';
const LOCAL_STORAGE_KEY_RESOURCES = 'ai_pipeline_resources_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);

  // Load persisted projects
  const [projects, setProjects] = useState<UserProject[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load projects from storage', e);
    }
    return INITIAL_PROJECTS;
  });

  // Load persisted checklist
  const [checklist, setChecklist] = useState<GlobalChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CHECKLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load checklist from storage', e);
    }
    return GLOBAL_CHECKLIST;
  });

  // Load persisted resources
  const [resources, setResources] = useState<ResourceLink[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_RESOURCES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load resources from storage', e);
    }
    return RESOURCE_LINKS;
  });

  // Save to localStorage on state change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to storage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CHECKLIST, JSON.stringify(checklist));
    } catch (e) {
      console.error('Failed to save checklist to storage', e);
    }
  }, [checklist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_RESOURCES, JSON.stringify(resources));
    } catch (e) {
      console.error('Failed to save resources to storage', e);
    }
  }, [resources]);

  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleResetChecklist = () => {
    if (confirm('운영 체크리스트를 기본값으로 재설정하시겠습니까?')) {
      setChecklist(GLOBAL_CHECKLIST);
    }
  };

  const handleAddProject = (newProject: UserProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setActiveTab('projects');
  };

  const handleAddResource = (newResource: Omit<ResourceLink, 'id'>) => {
    const resourceWithId: ResourceLink = {
      ...newResource,
      id: 'res-custom-' + Date.now(),
    };
    setResources((prev) => [...prev, resourceWithId]);
  };

  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const completedChecklistCount = checklist.filter((i) => i.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* 3-Zone Contract Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        totalProjects={projects.length}
        completedTasks={completedChecklistCount}
        totalTasks={checklist.length}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        {activeTab === 'pipeline' && (
          <div id="pipeline">
            <PipelineStageViewer />
          </div>
        )}

        {activeTab === 'projects' && (
          <div id="projects">
            <ProjectManager
              projects={projects}
              onUpdateProjects={setProjects}
              onOpenNewProject={() => setIsNewProjectModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'templates' && (
          <div id="templates">
            <TemplateGenerator />
          </div>
        )}

        {activeTab === 'checklist' && (
          <div id="checklist">
            <ChecklistTracker
              checklist={checklist}
              onToggleItem={handleToggleChecklistItem}
              onReset={handleResetChecklist}
            />
          </div>
        )}

        {activeTab === 'resources' && (
          <div id="resources">
            <ResourceLibrary
              resources={resources}
              onAddResource={handleAddResource}
              onDeleteResource={handleDeleteResource}
            />
          </div>
        )}
      </main>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-10 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Application Pipeline Studio. 기획부터 배포까지 엔드투엔드 1인 개발 자동화 가이드.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('pipeline')}
              className="hover:text-white transition"
            >
              파이프라인
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className="hover:text-white transition"
            >
              템플릿 생성기
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className="hover:text-white transition"
            >
              운영 3원칙
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
