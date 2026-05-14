export type DominanceLevel = 'alta' | 'media' | 'baixa';

export interface Question {
  id: string;
  text: string;
}

export interface Behavior {
  id: string;
  name: string;
  questions: Question[];
  feedbacks: {
    alta: string;
    media: string;
    baixa: string;
  };
}

export interface Competency {
  id: string;
  name: string;
  description: string;
  behaviors: Behavior[];
}

export interface LeaderProfile {
  id: string;
  name: string;
  competencies: string[]; // competency ids
  color: string;
}

export const DOMINANCE_RULES = {
  alta: { min: 70, max: 100, label: 'Alta Dominância', color: '#16a34a' },
  media: { min: 50, max: 69.99, label: 'Média Dominância', color: '#d97706' },
  baixa: { min: 0, max: 49.99, label: 'Baixa Dominância', color: '#dc2626' },
};

export function getDominanceLevel(score: number): DominanceLevel {
  if (score >= 70) return 'alta';
  if (score >= 50) return 'media';
  return 'baixa';
}

export const COMPETENCIES: Competency[] = [
  {
    id: 'relacionamento',
    name: 'Relacionamento Conectivo',
    description:
      'Capacidade de promover a cooperação e a colaboração dentro da equipe, gerando conexões e laços de confiança essenciais para a produção de inovação.',
    behaviors: [
      {
        id: 'imparcial',
        name: 'Imparcial',
        questions: [
          { id: 'imp1', text: 'Ao tomar decisões, considero as opiniões de todos os membros da equipe de forma igualitária.' },
          { id: 'imp2', text: 'Trato colegas e parceiros com justiça, independentemente de hierarquia ou afinidade pessoal.' },
          { id: 'imp3', text: 'Valorizo a diversidade de pensamentos e experiências no ambiente de trabalho.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Isso significa que você se dedica intensamente para criar bons relacionamentos e se preocupa em tratar todos de forma justa e igualitária, valorizando as diferenças. Para continuar evoluindo, busque conexões com profissionais diversos que possam trazer novas ideias e propor melhorias a partir de visões e repertórios diferentes.',
          media: 'Você possui média dominância deste comportamento. Você demonstra imparcialidade em muitas situações, mas ainda pode ampliar sua prática de escuta equitativa. Para evoluir, exercite conscientemente a neutralidade ao moderar debates e tomadas de decisão, garantindo que todas as vozes sejam consideradas.',
          baixa: 'Você possui baixa dominância deste comportamento. Desenvolver a imparcialidade é fundamental para a liderança 4.0. Comece identificando possíveis vieses em suas decisões e crie rituais de feedback coletivo onde todos possam se expressar de forma segura e igualitária.',
        },
      },
      {
        id: 'colaborativo',
        name: 'Colaborativo',
        questions: [
          { id: 'col1', text: 'Trabalho de forma colaborativa para alcançar objetivos comuns com minha equipe.' },
          { id: 'col2', text: 'Compartilho informações e recursos com colegas para potencializar os resultados.' },
          { id: 'col3', text: 'Construo redes de cooperação e parceria dentro e fora da organização.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você demonstra grande interesse em trabalhar em equipe e de forma colaborativa, ganhando a confiança de times e parceiros. Para continuar evoluindo, desenvolva novos canais de comunicação e dê voz às pessoas para obter mais informações, trocar opiniões e tomar decisões mais precisas.',
          media: 'Você possui média dominância deste comportamento. Você colabora bem, mas pode ampliar ainda mais sua cultura de compartilhamento. Invista em ferramentas e dinâmicas colaborativas e incentive a troca de conhecimento entre diferentes áreas da organização.',
          baixa: 'Você possui baixa dominância deste comportamento. A colaboração é essencial no contexto da Revolução 4.0. Comece criando pequenas iniciativas de trabalho conjunto, celebrando conquistas coletivas e valorizando as contribuições de cada membro da equipe.',
        },
      },
      {
        id: 'empoderador',
        name: 'Empoderador',
        questions: [
          { id: 'emp1', text: 'Crio um ambiente de trabalho que incentiva as pessoas a desenvolverem seu potencial.' },
          { id: 'emp2', text: 'Delego responsabilidades e confio na capacidade da equipe para executar tarefas.' },
          { id: 'emp3', text: 'Encorajo colegas a testar novas ideias e a assumir riscos calculados.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você faz novas conexões no ambiente profissional e explora seu potencial para liderar equipes diversas. Para continuar evoluindo, dedique-se à criação de um espaço de trabalho inspirador e seguro, que permita que a equipe confie para dar o melhor de si.',
          media: 'Você possui média dominância deste comportamento. Você empoderou parte de sua equipe, mas ainda há espaço para delegar mais e confiar mais nos talentos ao seu redor. Pratique a escuta ativa antes de direcionar soluções, e crie rituais de reconhecimento e autonomia.',
          baixa: 'Você possui baixa dominância deste comportamento. Empoderar pessoas é um pilar da liderança inovadora. Comece identificando talentos na sua equipe e oferecendo desafios progressivos que ampliem a autonomia de cada um, criando uma cultura de confiança mútua.',
        },
      },
      {
        id: 'democratico',
        name: 'Democrático',
        questions: [
          { id: 'dem1', text: 'Promovo espaços de diálogo onde todos têm voz para expressar suas opiniões.' },
          { id: 'dem2', text: 'Valorizo e incorporo as sugestões da equipe em minhas decisões.' },
          { id: 'dem3', text: 'Vejo divergências e debates como oportunidades de melhoria e inovação.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você desenvolve boas relações e aproveita as divergências como oportunidades. Para continuar evoluindo, expanda suas habilidades de facilitação e crie fóruns regulares de inovação participativa onde todos possam contribuir com ideias.',
          media: 'Você possui média dominância deste comportamento. Você desenvolve boas relações, mas pode aproveitar mais as oportunidades que divergências e debates trazem. Para evoluir, desenvolva habilidades de comunicação para fomentar relações ganha-ganha e garantir que todos tenham espaço para expor suas ideias.',
          baixa: 'Você possui baixa dominância deste comportamento. A liderança democrática é fundamental em ambientes de inovação. Experimente criar reuniões regulares de ideação, onde o líder atua como facilitador, e não como detentor das respostas.',
        },
      },
    ],
  },
  {
    id: 'empatia',
    name: 'Empatia',
    description:
      'Capacidade de se colocar no lugar de outra pessoa para entender suas ações, sentimentos, expectativas e opiniões, essencial para relacionamentos produtivos.',
    behaviors: [
      {
        id: 'prestativo',
        name: 'Prestativo',
        questions: [
          { id: 'pre1', text: 'Estou disponível para ajudar colegas e parceiros quando necessário.' },
          { id: 'pre2', text: 'Busco entender as necessidades das pessoas antes de propor soluções.' },
          { id: 'pre3', text: 'Coloco-me à disposição proativamente para apoiar o desenvolvimento da equipe.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você busca criar bons relacionamentos e compreender as necessidades das pessoas. Para continuar evoluindo, tenha proatividade e coloque-se à disposição sempre que possível para ajudar. Por meio do diálogo, é possível entender formas de melhorar produtos, serviços e processos internos.',
          media: 'Você possui média dominância deste comportamento. Você demonstra prestatividade em muitas situações, mas pode intensificar sua proatividade no suporte às pessoas. Pratique o check-in periódico com sua equipe e clientes para antecipar necessidades antes que se tornem problemas.',
          baixa: 'Você possui baixa dominância deste comportamento. Ser prestativo é um elemento central da empatia na liderança. Comece por ações simples: dedique tempo à sua equipe, pergunte como pode apoiá-la e esteja presente nos momentos de dificuldade.',
        },
      },
      {
        id: 'afetuoso',
        name: 'Afetuoso',
        questions: [
          { id: 'afe1', text: 'Demonstro cuidado genuíno com o bem-estar das pessoas ao meu redor.' },
          { id: 'afe2', text: 'Crio relações de confiança e acolhimento no ambiente profissional.' },
          { id: 'afe3', text: 'Reconheço os erros como oportunidades de aprendizado, sendo acolhedor em vez de punitivo.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você demonstra cuidado genuíno com as pessoas e cria um ambiente de confiança. Para continuar evoluindo, expanda essa afetuosidade para relações externas — clientes, parceiros e comunidade —, pois o líder 4.0 constrói ecossistemas de confiança.',
          media: 'Você possui média dominância deste comportamento. Você busca criar relações efetivas, mas precisa se concentrar mais nas pessoas e ouvi-las para entender suas experiências e sentimentos. Seja mais acolhedor e menos punitivo em sua equipe, vendo o erro como uma etapa em direção às melhores soluções.',
          baixa: 'Você possui baixa dominância deste comportamento. Desenvolver afetividade no contexto profissional fortalece a confiança e a inovação. Pratique gestos de reconhecimento, celebre conquistas da equipe e demonstre interesse genuíno pela vida e pelo desenvolvimento das pessoas.',
        },
      },
      {
        id: 'integrador',
        name: 'Integrador',
        questions: [
          { id: 'int1', text: 'Integro pessoas de diferentes perfis e opiniões para enriquecer as soluções.' },
          { id: 'int2', text: 'Facilito a troca de experiências entre membros da equipe com visões distintas.' },
          { id: 'int3', text: 'Crio espaços para que pessoas de diferentes níveis hierárquicos interajam e colaborem.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você trabalha com eficiência em equipe e integra bem pessoas diversas. Para continuar evoluindo, expanda essa integração para além da organização, criando pontes com comunidades externas, startups e parceiros que possam enriquecer sua visão.',
          media: 'Você possui média dominância deste comportamento. Você trabalha com eficiência em equipe, mas pode melhorar atentando-se às diversidades de opinião e criando espaços de diálogo para que colegas de todos os níveis troquem opiniões. Não parta do princípio de que já sabe o que o outro tem a oferecer antes de ouvi-lo.',
          baixa: 'Você possui baixa dominância deste comportamento. A integração de pessoas diversas é um fator estratégico para a inovação. Comece mapeando os talentos e perfis da sua equipe e criando dinâmicas que estimulem a colaboração entre diferentes funções e perspectivas.',
        },
      },
      {
        id: 'ouvinte',
        name: 'Ouvinte',
        questions: [
          { id: 'ouv1', text: 'Pratico a escuta ativa, dando atenção total ao que o outro está comunicando.' },
          { id: 'ouv2', text: 'Ouço antes de falar, sem formular respostas antes de entender completamente a mensagem.' },
          { id: 'ouv3', text: 'Busco compreender os sentimentos e perspectivas por trás das palavras das pessoas.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você pratica a escuta ativa com consistência, criando relações de profunda confiança. Para continuar evoluindo, pratique também a escuta do mercado e dos clientes, transformando insights em inovações que respondam às suas necessidades reais.',
          media: 'Você possui média dominância deste comportamento. Você ouve as pessoas, mas pode aprofundar essa prática. Promova a escuta ativa em seu ambiente de trabalho e ouça o que as outras pessoas têm a dizer antes de falar, em vez de formular respostas imediatas.',
          baixa: 'Você possui baixa dominância deste comportamento. A escuta ativa é um dos pilares da empatia e da liderança inovadora. Pratique exercícios de presença plena em conversas, evite interrupções e faça perguntas abertas que aprofundem sua compreensão sobre as necessidades do outro.',
        },
      },
    ],
  },
  {
    id: 'criatividade',
    name: 'Criatividade',
    description:
      'Capacidade de entender o processo criativo próprio e de outras pessoas e criar um ambiente propício ao desenvolvimento de novas ideias e soluções inovadoras.',
    behaviors: [
      {
        id: 'inventivo',
        name: 'Inventivo',
        questions: [
          { id: 'inv1', text: 'Proponho soluções novas e originais para os desafios que enfrento.' },
          { id: 'inv2', text: 'Uso ideias inovadoras para superar os desafios do mercado atual.' },
          { id: 'inv3', text: 'Estimulo a geração de novas ideias e abordagens na minha equipe.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você entende que o mercado atual trouxe novos desafios e usa ideias novas para superá-los. Para continuar evoluindo, dialogue e troque informações com seus colegas, pois ideias únicas e eficientes podem surgir a todo momento. Novos desafios requerem novas abordagens.',
          media: 'Você possui média dominância deste comportamento. Você é inventivo em muitas situações, mas pode ampliar sua capacidade de geração de ideias. Pratique métodos como Design Thinking e Lean Startup para sistematizar o processo criativo e transformar insights em inovações aplicáveis.',
          baixa: 'Você possui baixa dominância deste comportamento. Ser inventivo é uma habilidade que pode ser desenvolvida. Comece reservando tempo semanal para exploração criativa, buscando inspiração em setores diferentes do seu e criando um diário de ideias para capturar insights cotidianos.',
        },
      },
      {
        id: 'curioso',
        name: 'Curioso',
        questions: [
          { id: 'cur1', text: 'Busco ativamente novas possibilidades e oportunidades para meus projetos.' },
          { id: 'cur2', text: 'Saio da zona de conforto para explorar novas formas de realizar atividades.' },
          { id: 'cur3', text: 'Estou sempre em busca de tendências e inovações que possam beneficiar meu trabalho.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você busca ativamente novas possibilidades e explora constantemente novas formas de atuar. Para continuar evoluindo, canalize essa curiosidade para projetos concretos de inovação e compartilhe seus aprendizados com a equipe, multiplicando o impacto.',
          media: 'Você possui média dominância deste comportamento. Você pode melhorar ainda mais seus resultados por meio da criatividade. Saia mais de sua zona de conforto, busque mais ativamente novas possibilidades e explore novas formas de realizar as suas atividades com qualidade, sem medo de falhar.',
          baixa: 'Você possui baixa dominância deste comportamento. A curiosidade é o combustível da inovação. Estabeleça o hábito de ler sobre tendências de diferentes setores, participar de eventos de inovação e fazer perguntas que desafiem o status quo em sua organização.',
        },
      },
      {
        id: 'articulado',
        name: 'Articulado',
        questions: [
          { id: 'art1', text: 'Faço conexões entre conceitos e informações de diferentes áreas para criar soluções inovadoras.' },
          { id: 'art2', text: 'Articulo ideias de forma clara e persuasiva para engajar a equipe em novos projetos.' },
          { id: 'art3', text: 'Combino conhecimentos distintos para encontrar abordagens ainda não exploradas.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você faz conexões entre diferentes áreas do conhecimento para criar inovações. Para continuar evoluindo, expanda seu repertório para além do seu setor, buscando inspiração em áreas como arte, ciência e tecnologia para encontrar soluções disruptivas.',
          media: 'Você possui média dominância deste comportamento. Você deve trabalhar para ter uma postura mais articulada, esforçando-se para fazer conexões entre conceitos e informações ainda não relacionados. Busque conhecer melhor seu próprio processo criativo e colabore para o fortalecimento de uma cultura organizacional favorável à inovação.',
          baixa: 'Você possui baixa dominância deste comportamento. Articular ideias diversas é uma competência central para a inovação. Pratique técnicas de mapeamento mental, participe de grupos multidisciplinares e desenvolva o hábito de questionar "o que aconteceria se combinarmos X com Y?".',
        },
      },
      {
        id: 'original',
        name: 'Original',
        questions: [
          { id: 'ori1', text: 'Crio espaços de brainstorming para desenvolver ideias únicas com minha equipe.' },
          { id: 'ori2', text: 'Incentivo a criatividade coletiva, valorizando perspectivas e abordagens diferentes.' },
          { id: 'ori3', text: 'Proponho abordagens totalmente novas, mesmo quando existem processos já estabelecidos.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você cria consistentemente espaços de inovação e propõe abordagens originais. Para continuar evoluindo, estruture processos formais de inovação na sua organização — como laboratórios de ideias e hackathons — para ampliar o impacto da sua originalidade.',
          media: 'Você possui média dominância deste comportamento. Você deveria usar mais intensamente o contato com seus colegas para realizar brainstormings e debater novas ideias. Pense nas tendências que a Revolução 4.0 trouxe e crie espaços de diálogo capazes de fomentar novas soluções.',
          baixa: 'Você possui baixa dominância deste comportamento. A originalidade começa com a permissão para pensar diferente. Questione processos estabelecidos, incentive sua equipe a propor alternativas sem julgamento inicial e celebre as ideias mais ousadas, mesmo as que ainda não são viáveis.',
        },
      },
    ],
  },
  {
    id: 'mindset',
    name: 'Mindset Inovador',
    description:
      'Capacidade de atuar com excelência em ambientes inovadores, levando boas ideias ao mercado e lidando com a inovação com novas visões, sem se apegar a velhos conceitos.',
    behaviors: [
      {
        id: 'produtivo',
        name: 'Produtivo',
        questions: [
          { id: 'pro1', text: 'Facilito a criação de novas ideias que se traduzem em resultados concretos.' },
          { id: 'pro2', text: 'Gerencio o processo criativo da equipe para transformar ideias em projetos de valor.' },
          { id: 'pro3', text: 'Utilizo metodologias inovadoras para aumentar a produtividade da equipe.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você transforma ideias em resultados com eficácia. Para continuar evoluindo, invista em métodos ágeis e OKRs para ampliar a capacidade produtiva da sua equipe, garantindo que a inovação gere impacto mensurável e consistente.',
          media: 'Você possui média dominância deste comportamento. Você pode aproveitar mais o diálogo em equipe como forma de criar novas ideias e aumentar a produtividade. Colabore para a criação de um ambiente com liberdade de expressão, de modo que todos participem de debates capazes de gerar valor e conexões inovadoras.',
          baixa: 'Você possui baixa dominância deste comportamento. Produtividade inovadora requer sistemas e rituais de gestão. Comece implementando metodologias como Scrum ou Kanban para tornar o fluxo de trabalho mais transparente e criar espaços regulares para geração e priorização de ideias.',
        },
      },
      {
        id: 'visionario',
        name: 'Visionário',
        questions: [
          { id: 'vis1', text: 'Analiso tendências do mercado para antecipar mudanças e oportunidades futuras.' },
          { id: 'vis2', text: 'Penso além do presente, projetando cenários que podem impactar meu negócio.' },
          { id: 'vis3', text: 'Invisto tempo em refletir sobre como tecnologias emergentes podem transformar meu setor.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você antecipa cenários futuros com consistência. Para continuar evoluindo, compartilhe sua visão de forma inspiradora com sua equipe e stakeholders, criando uma narrativa de futuro que mobilize pessoas para a transformação.',
          media: 'Você possui média dominância deste comportamento. Você busca entender como as mudanças do mercado vão afetar seu ramo de atuação, mas pode se dedicar mais a refletir sobre ideias e possibilidades novas que podem beneficiar seu negócio. Estude seu segmento e as mudanças trazidas por tecnologias e ferramentas inovadoras.',
          baixa: 'Você possui baixa dominância deste comportamento. O pensamento visionário é essencial para navegar na Revolução 4.0. Dedique tempo semanal à leitura de relatórios de tendências, participe de eventos de futurismo e pratique o exercício de projetar cenários de 5 a 10 anos para o seu setor.',
        },
      },
      {
        id: 'agucado',
        name: 'Aguçado',
        questions: [
          { id: 'agu1', text: 'Identifico oportunidades de inovação que ainda não foram exploradas pelo mercado.' },
          { id: 'agu2', text: 'Faço julgamentos precisos sobre tendências e movimentos do mercado.' },
          { id: 'agu3', text: 'Analiso riscos de forma clara para tomar decisões de inovação com segurança.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você identifica oportunidades com precisão e faz julgamentos de mercado assertivos. Para continuar evoluindo, construa sistemas de inteligência competitiva na sua organização que transformem esse senso aguçado em vantagem estratégica sustentável.',
          media: 'Você possui média dominância deste comportamento. Você busca entender o mercado, mas pode aprofundar sua capacidade analítica. Crie uma rede de relacionamentos forte e motivada e obtenha conhecimentos sobre mercado e tecnologias que possam ajudar a ver as oportunidades de forma clara e objetiva.',
          baixa: 'Você possui baixa dominância deste comportamento. Você tem maior foco operacional e deveria se dedicar mais a análises sobre inovações. Desenvolva o hábito de análise de mercado periódica, utilize ferramentas de Business Intelligence e aprenda a interpretar dados como insumo para decisões de inovação.',
        },
      },
      {
        id: 'executor',
        name: 'Executor',
        questions: [
          { id: 'exe1', text: 'Converto ideias inovadoras em projetos concretos e resultados mensuráveis.' },
          { id: 'exe2', text: 'Gerencio a implementação de novas iniciativas com agilidade e eficácia.' },
          { id: 'exe3', text: 'Enfrento as incertezas do processo de inovação sem deixar que elas paralisem minha ação.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você transforma visão em ação com consistência e velocidade. Para continuar evoluindo, desenvolva métricas de inovação (KPIs de aprendizado, velocidade de experimentação) que tornem o processo de execução ainda mais eficaz e mensurável.',
          media: 'Você possui média dominância deste comportamento. Você busca realizar suas atividades bem, mas precisa ampliar sua disposição para lidar com incertezas e mudanças de paradigma. Tente gerenciar seu processo criativo para que ideias de sucesso sejam geradas e implementadas consistentemente.',
          baixa: 'Você possui baixa dominância deste comportamento. Executar com foco na inovação requer tolerância ao erro e agilidade. Adote a mentalidade de MVP (Produto Mínimo Viável), testando ideias rapidamente em pequena escala antes de grandes investimentos, e desenvolva a disciplina de aprender com cada iteração.',
        },
      },
    ],
  },
  {
    id: 'adaptabilidade',
    name: 'Adaptabilidade',
    description:
      'Capacidade de resistir a situações difíceis e adaptar-se para encontrar melhores soluções, ajustando o foco constantemente para objetivos alcançáveis.',
    behaviors: [
      {
        id: 'obstinado',
        name: 'Obstinado',
        questions: [
          { id: 'obs1', text: 'Persisto na busca pelos meus objetivos mesmo diante de obstáculos e contratempos.' },
          { id: 'obs2', text: 'Mantenho o foco e a qualidade do trabalho mesmo em situações adversas.' },
          { id: 'obs3', text: 'Não desisto dos meus projetos quando enfrento dificuldades, buscando sempre alternativas.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você persiste com qualidade mesmo diante de contratempos. Para continuar evoluindo, mantenha o controle emocional do time e entenda a necessidade de fazer adaptações em produtos e serviços para lidar assertivamente com as mudanças de cenário cada vez mais intensas.',
          media: 'Você possui média dominância deste comportamento. Você demonstra obstinação em muitas situações, mas pode fortalecer sua resiliência diante de adversidades mais complexas. Pratique técnicas de gestão emocional e desenvolva planos de contingência que mantenham a equipe focada mesmo nos momentos mais desafiadores.',
          baixa: 'Você possui baixa dominância deste comportamento. A obstinação é essencial para inovar em ambientes VUCA. Desenvolva sua resiliência praticando mindfulness, definindo metas menores e celebrando progressos incrementais que sustentem a motivação ao longo de projetos desafiadores.',
        },
      },
      {
        id: 'determinado',
        name: 'Determinado',
        questions: [
          { id: 'det1', text: 'Faço minha equipe perseguir os objetivos com intensidade e comprometimento.' },
          { id: 'det2', text: 'Mantenho minha determinação para alcançar metas mesmo em cenários de incerteza.' },
          { id: 'det3', text: 'Transmito postura obstinada para minha equipe, motivando-a a superar desafios.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você faz sua equipe perseguir objetivos com intensidade. Para continuar evoluindo, analise as novas tendências do seu segmento e atualize seus planos de ação, transmitindo sua postura obstinada para que a equipe trabalhe colaborativamente em ambientes complexos.',
          media: 'Você possui média dominância deste comportamento. Você demonstra determinação, mas pode intensificar sua capacidade de mobilizar a equipe em torno de metas ambiciosas. Trabalhe a comunicação de propósito e conecte cada objetivo ao impacto maior que ele gera para a organização e para as pessoas.',
          baixa: 'Você possui baixa dominância deste comportamento. A determinação é fundamental para liderar projetos de inovação. Comece definindo metas com critérios claros de sucesso (SMART), revisando-as periodicamente e criando rituais de acompanhamento que mantenham a equipe focada e motivada.',
        },
      },
      {
        id: 'pragmatico',
        name: 'Pragmático',
        questions: [
          { id: 'pra1', text: 'Reajusto meu foco e estratégia quando percebo que o caminho atual não é o mais eficaz.' },
          { id: 'pra2', text: 'Adapto meus planos às mudanças de cenário sem perder de vista os objetivos finais.' },
          { id: 'pra3', text: 'Tomo decisões práticas e objetivas, alinhadas às necessidades reais da organização.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você reajusta o foco com agilidade quando os cenários mudam. Para continuar evoluindo, desenvolva uma cultura de experimentação na sua equipe, onde pivotar é visto como sinal de inteligência estratégica e não de fraqueza.',
          media: 'Você possui média dominância deste comportamento. Você é capaz de reajustar o foco, mas pode ampliar sua agilidade decisória. Tente sempre direcionar sua energia para objetivos aderentes às necessidades atualizadas da organização e de seus clientes, com as melhores práticas do mercado.',
          baixa: 'Você possui baixa dominância deste comportamento. Ser pragmático no contexto da inovação significa equilibrar visão e execução. Pratique ciclos curtos de planejamento-execução-revisão (sprints), ajustando a rota com base em dados e feedbacks reais do mercado.',
        },
      },
      {
        id: 'versatil',
        name: 'Versátil',
        questions: [
          { id: 'ver1', text: 'Adapto minhas estratégias com eficiência quando encontro barreiras inesperadas.' },
          { id: 'ver2', text: 'Abordo desafios com múltiplas perspectivas até encontrar a melhor solução.' },
          { id: 'ver3', text: 'Demonstro capacidade de atuar em diferentes contextos e com diferentes metodologias.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você adapta estratégias com eficiência. Para continuar evoluindo, compartilhe seu repertório de abordagens com a equipe, criando um banco de metodologias que possa ser acionado conforme as demandas específicas de cada projeto.',
          media: 'Você possui média dominância deste comportamento. Você ainda pode adaptar as estratégias com maior eficiência quando encontra barreiras. Mantenha a postura persistente e encare desafios com múltiplas abordagens até encontrar as melhores soluções em um mercado VUCA.',
          baixa: 'Você possui baixa dominância deste comportamento. A versatilidade é essencial para sobreviver e prosperar na Revolução 4.0. Invista em aprendizado contínuo, amplie seu repertório de metodologias e exercite a capacidade de ver os problemas por diferentes ângulos antes de escolher uma solução.',
        },
      },
    ],
  },
  {
    id: 'solucionar',
    name: 'Solucionar Problemas Complexos',
    description:
      'Capacidade de usar métodos rigorosos e eficientes para encontrar soluções, desenvolvendo habilidades de investigação e reflexão para lidar bem com incertezas e mudanças.',
    behaviors: [
      {
        id: 'logico',
        name: 'Lógico',
        questions: [
          { id: 'log1', text: 'Utilizo métodos rigorosos e estruturados para analisar problemas complexos.' },
          { id: 'log2', text: 'Aplico raciocínio lógico para encontrar a causa raiz dos problemas que enfrento.' },
          { id: 'log3', text: 'Uso dados e evidências para embasar minhas decisões e soluções.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você usa a lógica e métodos rigorosos de análise para resolver problemas complexos. Para continuar evoluindo, busque sempre fazer reflexões francas e ágeis sobre as complexidades que você enfrenta, direcionando o trabalho de sua equipe com base em dados e análises robustas.',
          media: 'Você possui média dominância deste comportamento. Você aplica lógica em suas análises, mas pode aprofundar o uso de dados e metodologias estruturadas. Invista em ferramentas de análise como Diagrama de Ishikawa, 5 Porquês e análise SWOT para embasar melhor suas decisões.',
          baixa: 'Você possui baixa dominância deste comportamento. O pensamento lógico é a base da resolução de problemas complexos. Comece praticando a decomposição de problemas em partes menores, questionando cada premissa e buscando dados que confirmem ou refutem suas hipóteses antes de agir.',
        },
      },
      {
        id: 'investigador',
        name: 'Investigador',
        questions: [
          { id: 'pes1', text: 'Busco informações além do óbvio para encontrar soluções mais eficazes.' },
          { id: 'pes2', text: 'Questiono as primeiras respostas e investigo mais profundamente os problemas.' },
          { id: 'pes3', text: 'Adoto postura analítica para identificar problemas ocultos em projetos e processos.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você vai além do óbvio para encontrar soluções eficazes. Para continuar evoluindo, estruture processos formais de pesquisa e análise na sua organização — como pesquisas com usuários e análise competitiva — que transformem sua investigação em vantagem estratégica.',
          media: 'Você possui média dominância deste comportamento. Você nem sempre aproveita todas as fontes válidas de informação. Para desenvolver este comportamento, lembre-se de olhar para além do óbvio e nunca pare de refletir nas primeiras respostas. Um bom líder deve encontrar problemas ocultos e adotar uma postura analítica e ágil.',
          baixa: 'Você possui baixa dominância deste comportamento. Ser investigador requer curiosidade e método. Desenvolva o hábito de questionar o "porquê" de cada situação pelo menos 3 vezes antes de aceitar a primeira resposta, e construa o costume de buscar fontes diversas antes de tomar decisões importantes.',
        },
      },
      {
        id: 'flexivel',
        name: 'Flexível',
        questions: [
          { id: 'fle1', text: 'Lido bem com mudanças e incertezas no ambiente profissional.' },
          { id: 'fle2', text: 'Analiso múltiplos aspectos de um problema antes de tomar decisões.' },
          { id: 'fle3', text: 'Tenho agilidade para tomar atitudes efetivas mesmo sem ter todas as informações disponíveis.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você lida bem com mudanças e incertezas. Para continuar evoluindo, ajude sua equipe a desenvolver a mesma flexibilidade, criando rituais de retrospectiva que normalizem a mudança como parte do processo de inovação e crescimento.',
          media: 'Você possui média dominância deste comportamento. Você deve fortalecer ainda mais sua capacidade de lidar com mudanças e incertezas. Esteja sempre atento às novas tendências do mercado e analise diversos aspectos que favoreçam suas tomadas de decisão, sempre pensando antes de agir.',
          baixa: 'Você possui baixa dominância deste comportamento. Flexibilidade é uma competência crítica em ambientes de inovação. Pratique tomada de decisão com informações incompletas, adote a mentalidade de "fail fast, learn fast" e desenvolva protocolos claros para revisão de rotas quando os cenários mudam.',
        },
      },
      {
        id: 'proativo',
        name: 'Proativo',
        questions: [
          { id: 'poa1', text: 'Antecipo problemas e ajo antes que eles se tornem críticos.' },
          { id: 'poa2', text: 'Tomo iniciativa para resolver questões sem esperar que todos os detalhes estejam definidos.' },
          { id: 'poa3', text: 'Uso todas as informações disponíveis com agilidade para projetar ações assertivas.' },
        ],
        feedbacks: {
          alta: 'Você possui alta dominância deste comportamento. Você antecipa problemas e age com agilidade. Para continuar evoluindo, desenvolva sistemas de monitoramento e early warning na sua organização que ampliem sua capacidade de detectar oportunidades e riscos antes que se tornem evidentes para o mercado.',
          media: 'Você possui média dominância deste comportamento. Você deveria fortalecer sua capacidade de tomar decisões e agir sem ter uma visão total da situação. Use todas as informações disponíveis com agilidade para compreender o que está acontecendo e projetar ações assertivas sem se paralisar.',
          baixa: 'Você possui baixa dominância deste comportamento. Proatividade é um diferencial competitivo na era da inovação. Comece desenvolvendo o hábito de antecipar cenários semanalmente, identificar possíveis gargalos antes que ocorram e agir sobre eles sem esperar pela perfeição das informações.',
        },
      },
    ],
  },
];

export const LEADER_PROFILES: LeaderProfile[] = [
  {
    id: 'conectivo',
    name: 'Líder Conectivo',
    competencies: ['relacionamento', 'empatia'],
    color: '#7c3aed',
  },
  {
    id: 'criativo',
    name: 'Líder Criativo',
    competencies: ['criatividade', 'mindset'],
    color: '#ea580c',
  },
  {
    id: 'adaptativo',
    name: 'Líder Adaptativo',
    competencies: ['adaptabilidade', 'solucionar'],
    color: '#0891b2',
  },
];

export interface AssessmentResults {
  userName: string;
  userEmail: string;
  userRole: string;
  behaviorScores: Record<string, number>;
  competencyScores: Record<string, number>;
  profileScores: Record<string, number>;
  overallScore: number;
  completedAt: string;
}

export function calculateResults(
  userName: string,
  userEmail: string,
  userRole: string,
  answers: Record<string, number>
): AssessmentResults {
  const behaviorScores: Record<string, number> = {};
  const competencyScores: Record<string, number> = {};
  const profileScores: Record<string, number> = {};

  for (const competency of COMPETENCIES) {
    const compBehaviorScores: number[] = [];

    for (const behavior of competency.behaviors) {
      const questionScores = behavior.questions.map((q) => {
        const answer = answers[q.id] ?? 0;
        return ((answer - 1) / 4) * 100;
      });
      const avgScore = questionScores.reduce((a, b) => a + b, 0) / questionScores.length;
      behaviorScores[behavior.id] = Math.round(avgScore);
      compBehaviorScores.push(avgScore);
    }

    const compAvg = compBehaviorScores.reduce((a, b) => a + b, 0) / compBehaviorScores.length;
    competencyScores[competency.id] = Math.round(compAvg);
  }

  for (const profile of LEADER_PROFILES) {
    const profileCompScores = profile.competencies.map((cid) => competencyScores[cid] ?? 0);
    profileScores[profile.id] = Math.round(
      profileCompScores.reduce((a, b) => a + b, 0) / profileCompScores.length
    );
  }

  const overallScore = Math.round(
    Object.values(competencyScores).reduce((a, b) => a + b, 0) / COMPETENCIES.length
  );

  return {
    userName,
    userEmail,
    userRole,
    behaviorScores,
    competencyScores,
    profileScores,
    overallScore,
    completedAt: new Date().toISOString(),
  };
}
