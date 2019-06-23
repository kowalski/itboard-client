import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import FormSteps from '../components/createOffer/FormSteps'
import LoginForm from '../components/loginForm/LoginForm'
import DetailsForm from '../components/createOffer/DetailsForm'
import ContentForm from '../components/createOffer/ContentForm'
import PreviewForm from '../components/createOffer/PreviewForm'

class CreateOffer extends React.Component {

  state = {
    currentStep: !this.props.auth.user ? 1 : 2
    // currentStep: 4,
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.user !== prevProps.auth.user) {
      this.setState({ currentStep: !this.props.auth.user ? 1 : 2 })
    }
  }

  render() {

    const layoutSetings = {
      meta: {
      },
      withSidebar: false
    }

    const formSteps = ['login', 'detials', 'content']

    let content = <LoginForm />

    if (this.state.currentStep === 2) {
      content = <DetailsForm submitOffer={() => this.setState({currentStep: 3})} />
    }

    if (this.state.currentStep === 3) {
      content = <ContentForm submitOffer={() => this.setState({currentStep: 4})} />
    }

    if (this.state.currentStep === 4) {
      content = <PreviewForm editOffer={() => this.setState({currentStep: 2})} />
    }

    return (
      <Layout {...layoutSetings}>
        <Logo black />
        <FormSteps steps={formSteps} currentStep={this.state.currentStep} />
        {content}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(CreateOffer)