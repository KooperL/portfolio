import { get } from '../../../api/restApi';
import { ProjectsPayload } from '../../projectsPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';

export const fetchProjects = (): Promise<ProjectsPayload>  => {
  const apiConfig = {
    headers: {},
    params: {}
  }
  return get(endpoints['projects'], apiConfig);

}