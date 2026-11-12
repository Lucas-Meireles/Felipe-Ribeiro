// Conteúdo dos documentos legais do site.
// IMPORTANTE: os textos descrevem o funcionamento real do site (sem analytics,
// sem cookies de publicidade, formulário que apenas abre o WhatsApp).
// Se o site passar a usar Google Analytics, Meta Pixel ou similares, a política
// e o aviso de cookies precisam ser atualizados ANTES da publicação.

export const LEGAL_UPDATED_AT = '12 de novembro de 2026';

export const PRIVACY_PATH = '/politica-de-privacidade';
export const TERMS_PATH = '/termos-de-uso';

const CONTROLLER = 'Felipe Vinicius Santana Ribeiro, advogado inscrito na OAB/SP sob o nº 543.966';
const CONTACT = 'pelo WhatsApp/telefone <a href="https://wa.me/5511944548048" target="_blank" rel="noopener noreferrer">+55 (11) 94454-8048</a>';

export const LEGAL_DOCUMENTS = {
  [PRIVACY_PATH]: {
    eyebrow: 'PRIVACIDADE · LGPD',
    title: 'Política de Privacidade',
    titleEm: 'e Cookies',
    lead: 'Como as informações de quem acessa este site são tratadas, em linguagem direta e de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
    sections: [
      {
        id: 'controlador',
        title: 'Quem é o responsável',
        body: `<p>O responsável (controlador) pelo tratamento dos dados pessoais relacionados a este site é ${CONTROLLER}. Dúvidas e solicitações sobre privacidade podem ser enviadas ${CONTACT}.</p>`
      },
      {
        id: 'dados',
        title: 'Quais dados podem ser tratados',
        body: `
          <p><strong>Dados que você informa.</strong> O formulário de contato pede nome, WhatsApp, e-mail (opcional) e uma descrição da sua necessidade. <strong>Essas informações não são gravadas em nenhum servidor do site:</strong> o formulário apenas monta uma mensagem e abre o WhatsApp no seu dispositivo. A mensagem só é enviada se você confirmar o envio no próprio WhatsApp.</p>
          <p><strong>Dados técnicos de navegação.</strong> Como qualquer site, a empresa de hospedagem registra automaticamente informações técnicas das requisições (como endereço IP, tipo de navegador, página acessada, data e hora), utilizadas para funcionamento, segurança e prevenção de abusos.</p>
          <p><strong>Dados armazenados no seu navegador.</strong> Pequenos registros locais descritos na seção “Cookies e armazenamento local”.</p>
          <p>Este site <strong>não utiliza</strong> ferramentas de análise de audiência, cookies de publicidade, pixels de rastreamento ou perfis de comportamento.</p>`
      },
      {
        id: 'finalidades',
        title: 'Para que os dados são usados',
        body: `
          <ul>
            <li><strong>Responder ao seu contato</strong> e conduzir o atendimento inicial que você solicitou — base legal: procedimentos preliminares relacionados a contrato, a pedido do titular (art. 7º, V, da LGPD).</li>
            <li><strong>Manter o site seguro e funcionando</strong> — base legal: legítimo interesse (art. 7º, IX).</li>
            <li><strong>Lembrar sua preferência de tema</strong> (claro ou escuro) — base legal: consentimento (art. 7º, I), que pode ser recusado ou revogado a qualquer momento.</li>
            <li><strong>Cumprir obrigações legais e exercer direitos</strong> em processos, quando aplicável — art. 7º, II e VI.</li>
          </ul>
          <p>Informações compartilhadas no contexto de um atendimento jurídico são protegidas pelo sigilo profissional previsto no Estatuto da Advocacia (Lei nº 8.906/1994) e no Código de Ética e Disciplina da OAB.</p>`
      },
      {
        id: 'cookies',
        title: 'Cookies e armazenamento local',
        body: `
          <p>O site não grava cookies próprios de rastreamento. Ele utiliza apenas o armazenamento local do navegador para as funções abaixo:</p>
          <div class="legal-table" role="table" aria-label="Itens armazenados no navegador">
            <div role="row" class="legal-table-head"><span role="columnheader">Item</span><span role="columnheader">Finalidade</span><span role="columnheader">Categoria</span></div>
            <div role="row"><span role="cell"><code>felipe-cookie-consent</code></span><span role="cell">Guarda a sua escolha neste aviso de cookies.</span><span role="cell">Essencial</span></div>
            <div role="row"><span role="cell"><code>felipe-regional-check-v2</code></span><span role="cell">Registro técnico de verificação de acesso ao site.</span><span role="cell">Essencial</span></div>
            <div role="row"><span role="cell">Cache de imagens</span><span role="cell">Guarda imagens do site para carregamento mais rápido nas próximas visitas.</span><span role="cell">Essencial</span></div>
            <div role="row"><span role="cell"><code>felipe-theme</code></span><span role="cell">Lembra se você prefere o tema claro ou escuro.</span><span role="cell">Preferência (somente com consentimento)</span></div>
          </div>
          <p><strong>Serviços de terceiros.</strong> As fontes tipográficas são hospedadas no próprio site, sem consulta a serviços externos. Os botões de WhatsApp e Instagram levam a serviços da Meta, que passam a aplicar as próprias políticas somente quando você clica neles.</p>
          <p>Você pode alterar sua escolha a qualquer momento em <button type="button" class="legal-inline-button" data-open-cookie-settings>Preferências de cookies</button> ou apagar os dados do site nas configurações do seu navegador.</p>`
      },
      {
        id: 'compartilhamento',
        title: 'Compartilhamento e transferência internacional',
        body: `
          <p>Os dados pessoais não são vendidos nem cedidos para fins de publicidade. Eles podem ser tratados por fornecedores necessários ao funcionamento do site e do atendimento:</p>
          <ul>
            <li><strong>Vercel Inc.</strong> — hospedagem do site;</li>
            <li><strong>Meta Platforms</strong> — WhatsApp e Instagram, quando você escolhe utilizá-los.</li>
          </ul>
          <p>Alguns desses fornecedores podem processar dados fora do Brasil. Nesses casos, a transferência ocorre nas hipóteses permitidas pelo art. 33 da LGPD.</p>
          <p>Dados também podem ser fornecidos a autoridades quando houver obrigação legal ou ordem judicial, sempre respeitado o sigilo profissional.</p>`
      },
      {
        id: 'retencao',
        title: 'Por quanto tempo os dados ficam guardados',
        body: `<p>As conversas de atendimento são mantidas pelo tempo necessário ao atendimento e, havendo contratação, pelo período exigido para cumprimento de obrigações legais, éticas e para o exercício regular de direitos. Os registros técnicos de navegação seguem os prazos da empresa de hospedagem. Os itens do armazenamento local permanecem no seu navegador até que você os apague.</p>`
      },
      {
        id: 'seguranca',
        title: 'Segurança',
        body: `<p>O site é servido exclusivamente por conexão criptografada (HTTPS) e não mantém banco de dados com informações de visitantes. Ainda assim, nenhum meio de transmissão pela internet é totalmente imune a riscos. Por isso, recomenda-se compartilhar no primeiro contato apenas as informações necessárias para a compreensão inicial do caso.</p>`
      },
      {
        id: 'direitos',
        title: 'Seus direitos',
        body: `
          <p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
          <ul>
            <li>confirmação da existência de tratamento e acesso aos dados;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>informação sobre compartilhamentos realizados;</li>
            <li>revogação do consentimento.</li>
          </ul>
          <p>As solicitações podem ser feitas ${CONTACT}. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</p>`
      },
      {
        id: 'alteracoes',
        title: 'Alterações desta política',
        body: `<p>Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última atualização fica sempre indicada no topo desta página.</p>`
      }
    ]
  },

  [TERMS_PATH]: {
    eyebrow: 'TERMOS · CONDIÇÕES DE USO',
    title: 'Termos e Condições',
    titleEm: 'de Uso',
    lead: 'Regras para a utilização deste site e esclarecimentos sobre a natureza das informações aqui publicadas.',
    sections: [
      {
        id: 'aceitacao',
        title: 'Aceitação',
        body: `<p>Ao acessar e utilizar este site, você declara estar ciente destes Termos e Condições de Uso e da <a href="${PRIVACY_PATH}">Política de Privacidade e Cookies</a>. Caso não concorde, recomenda-se não utilizar o site.</p>`
      },
      {
        id: 'sobre',
        title: 'Sobre o site',
        body: `<p>Este é o site profissional de ${CONTROLLER}. O conteúdo tem caráter exclusivamente informativo, em conformidade com o Código de Ética e Disciplina da OAB e com as normas da OAB sobre publicidade na advocacia.</p>`
      },
      {
        id: 'natureza',
        title: 'Natureza informativa do conteúdo',
        body: `<p>Os textos, artigos e materiais publicados têm finalidade de orientação geral e <strong>não constituem consultoria ou parecer jurídico</strong>. Cada situação depende dos fatos, documentos e do andamento processual específico, e exige análise individualizada por advogado. Não tome decisões com base apenas nas informações deste site.</p>`
      },
      {
        id: 'relacao',
        title: 'Contato e contratação',
        body: `
          <p>O envio de mensagens pelo formulário, WhatsApp ou outros canais <strong>não estabelece, por si só, relação de contratação</strong> entre você e o advogado. A prestação de serviços jurídicos depende de aceite expresso e da formalização de contrato de honorários, com escopo e condições definidos.</p>
          <p>Não há garantia de resultado em nenhum caso: a atuação do advogado é de meio, e não de resultado.</p>`
      },
      {
        id: 'sigilo',
        title: 'Sigilo e confidencialidade',
        body: `<p>As informações compartilhadas no contexto de um atendimento são tratadas com sigilo, nos termos do Estatuto da Advocacia e do Código de Ética e Disciplina da OAB. Para sua segurança, compartilhe no primeiro contato apenas o necessário para a compreensão inicial da situação.</p>`
      },
      {
        id: 'uso',
        title: 'Uso adequado',
        body: `
          <p>Ao utilizar o site, você se compromete a não:</p>
          <ul>
            <li>utilizá-lo para fins ilícitos ou que violem direitos de terceiros;</li>
            <li>enviar informações falsas ou se passar por outra pessoa;</li>
            <li>tentar acessar áreas restritas, interferir no funcionamento ou explorar vulnerabilidades do site;</li>
            <li>coletar dados do site por meios automatizados para fins comerciais sem autorização.</li>
          </ul>`
      },
      {
        id: 'propriedade',
        title: 'Propriedade intelectual',
        body: `<p>Textos, imagens, marca, logotipo e identidade visual deste site são protegidos pela legislação de direitos autorais e de propriedade intelectual. A reprodução, total ou parcial, depende de autorização prévia, exceto o compartilhamento do link das páginas ou a citação breve com indicação da fonte.</p>`
      },
      {
        id: 'terceiros',
        title: 'Links e serviços de terceiros',
        body: `<p>O site contém links para serviços externos, como WhatsApp e Instagram. Esses serviços possuem termos e políticas próprios, e o seu uso é de responsabilidade dos respectivos fornecedores.</p>`
      },
      {
        id: 'responsabilidade',
        title: 'Disponibilidade e responsabilidade',
        body: `<p>Busca-se manter o site disponível e com informações atualizadas, mas não é possível garantir funcionamento ininterrupto ou livre de falhas técnicas. As informações jurídicas refletem o entendimento na data de publicação e podem ser afetadas por mudanças legislativas ou jurisprudenciais.</p>`
      },
      {
        id: 'alteracoes',
        title: 'Alterações',
        body: `<p>Estes Termos podem ser atualizados a qualquer momento. A versão vigente é sempre a publicada nesta página, com a data da última atualização indicada no topo.</p>`
      },
      {
        id: 'legislacao',
        title: 'Legislação aplicável e contato',
        body: `<p>Estes Termos são regidos pela legislação brasileira. Dúvidas sobre este documento podem ser enviadas ${CONTACT}.</p>`
      }
    ]
  }
};
