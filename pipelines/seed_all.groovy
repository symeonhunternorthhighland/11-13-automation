folder('Automation Demo') {
    displayName('Automation Demo')
    description('Folder for all jobs related to testing Automation Demo')
      configure { project ->            	
        project / healthMetrics / 'com.cloudbees.hudson.plugins.folder.health.WorstChildHealthMetric' / nonRecursive << 'false'
    }
}
folder('Automation Demo/Feature Tests') {
    displayName('Feature Tests')
    description('List of all the Feature tests for Automation Demo.')
      configure { project ->            	
        project / healthMetrics / 'com.cloudbees.hudson.plugins.folder.health.WorstChildHealthMetric' / nonRecursive << 'false'
    }
}
job('Automation Demo/Feature Tests/Test Feature') {
  description('Runs the features/test.feature test for Automation Demo')
  displayName('Test Feature')

  logRotator {
		numToKeep(3)
		daysToKeep(5)
	}

	properties {
    copyArtifactPermissionProperty {
      projectNames('/Automation Demo/Full Test Report')
    }

  }
  scm {
		git {
			branch('main')
				remote {
					github('{{https://github.com/symeonhunternorthhighland/11-13-automation.git}}')
					credentials('github_key')
				}
		}
	}
  wrappers {
    nodejs('default node')
    credentialsBinding {

    }
	browserStackBuildWrapper {
		credentialsId('browserstack_key')
	}
  }
  steps {
		shell (
			'''chmod 775 ./pipelines/build_steps/run-test.sh
			./pipelines/build_steps/run-test.sh --feature_file_name features/test.feature'''
		)

  }
  publishers {

    allure(['out'])
	browserStackReportPublisher()
	archiveArtifacts('out/*.xml, logs/*.png')
	downstream('Automation Demo/Full Test Report', 'FAILURE')
	cleanWs {
      cleanWhenAborted(true)
      cleanWhenFailure(true)
      cleanWhenNotBuilt(false)
      cleanWhenSuccess(true)
      cleanWhenUnstable(true)
      deleteDirs(true)
      notFailBuild(true)
    }
  }
  
}
job('Automation Demo/All Tests') {
  description('Runs all the feature tests for Automation Demo')
  logRotator {
		numToKeep(3)
		daysToKeep(5)
	}
	// triggers {
	// 	cron('H 4 * * *')
  // }
  publishers {
    
    downstream('Automation Demo/Feature Tests/Test Feature', 'SUCCESS')
  }
}
job('Automation Demo/Full Test Report') {
  description('Grabs latest test results from all the feature tests for Automation Demo. NOTE: This job is triggered by the other jobs. DO NOT USE setting [build after other projects are built].')
  logRotator {
		numToKeep(3)
		daysToKeep(5)
	}	
  wrappers {
    preBuildCleanup()
  }
  steps {
    
    copyArtifacts('Automation Demo/Feature Tests/Test Feature') {
      includePatterns('out/*.xml, logs/*.png')
      buildSelector {
          lastWithArtifacts()
      }
    }
  }
  publishers {
    allure(['out'])
  }
}  
