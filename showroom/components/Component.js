import React from 'react';
import _axios from 'axios';
import { parse } from 'react-docgen';
import { props, t } from 'tcomb-react';
import { find } from 'lodash';
import Markdown from 'react-remarkable';
import generateMarkdown from '../../generateReadmes/generateMarkdown';
import KitchenSink from '../../src/kitchen-sink';


@props({
  router: t.Function,
  query: t.Object,
  params: t.Object,
  sections: t.Array,
  openSections: t.Array,
  section: t.Object,
  onToggleSection: t.Function,
  scope: t.Object,
  onSelectItem: t.Function
})
export default class Component extends React.Component {

  constructor(props) {
    super(props);
    this.axios = _axios.create({ baseURL: 'https://rawgit.com/buildo' });
    this.state = { loading: true };
  }

  componentDidMount() {
    this.loadComponent();
  }

  loadComponent = (props = this.props) => {
    const { params: { componentId }, sections, section } = props;

    const componentInfo = find(section.components, { id: componentId });

    const componentLink = this.axios.get(componentInfo.component);
    const examplesLinks = componentInfo.examples.map(e => this.axios.get(e));
    _axios.all([componentLink].concat(examplesLinks))
      .then(res => {
        const component = parse(res[0].data);
        const markdown = generateMarkdown(componentInfo.title, component);
        const header = <Markdown source={markdown.split('Props')[0]} options={{ html: true }}/>;
        const footer = <Markdown source={`Props\n${markdown.split('Props')[1]}`} options={{ html: true }}/>;
        const examples = res.slice(1).map(r => r.data);
        const components = section.components.map(c => c.id === componentId ? { ...c, examples } : c);
        const mappedSections = sections.map(s => s.id === section.id ? { ...s, components } : s);
        this.setState({ sections: mappedSections, header, footer, loading: false });
      });
  }

  render() {
    const { sections: mappedSections, header, footer, loading } = this.state;
    const {
      params: { componentId, sectionId },
      openSections, onToggleSection,
      onSelectItem, scope,
      sections: propSections } = this.props;
    const sections = mappedSections || propSections;
    const props = { sections, openSections, sectionId, componentId, onToggleSection, onSelectItem, scope, header, footer, loading };

    return <KitchenSink {...props} />;
  }

  componentWillReceiveProps(nextProps) {
    const { params: { componentId, sectionId } } = nextProps;
    if (componentId !== this.props.params.componentId || sectionId !== this.props.params.sectionId) {
      // resetState
      this.state = { loading: true };
      this.forceUpdate();

      this.loadComponent(nextProps);
    }
  }

}
