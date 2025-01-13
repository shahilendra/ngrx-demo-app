// import { createReducer, on } from '@ngrx/store';
// import { Department } from './department.model';
// import * as DepartmentActions from './department-actions';
// import { map } from 'rxjs';
// export const todoFeatureKey = 'departments';
// export interface DepartmentState {
// departments: Department[];
// entities: {[key:string]: Department};
// loading: boolean;
// error: string;
// }
// export const initialDepartmentState: DepartmentState = {
// departments: [],
// entities: {},
// loading: false,
// error: ''
// };
// export const departmentReducer = createReducer(
//     initialDepartmentState,

//     on(DepartmentActions.loadDepartment, state => ({ ...state, loading: true })),

//     on(DepartmentActions.loadDepartmentSuccess, (state, { departments }) =>({ ...state, departments, entities: departments.reduce((a, v) => ({ ...a, [v._id]: v}), {}) ,  loading: false })),

//     on(DepartmentActions.loadDepartmentFailure, (state, { error }) => ({ ...state, error, loading: false })),
    
//     on(DepartmentActions.addDepartmentSuccess, (state, { departments }) =>({ ...state, departments, loading: false })),

//     on(DepartmentActions.addDepartmentFailure, (state, { error }) => ({ ...state, error, loading: false })),

//     on(DepartmentActions.deleteDepartmentSuccess, (state, { id }) => ({ ...state, departments: state.departments.filter(t => t._id !== id) })),
    
//     on(DepartmentActions.deleteDepartmentFailure, (state, { error }) => ({ ...state, error, loading: false }))
    
// );
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Department } from './department.model';
import * as DepartmentActions from './department-actions';

export interface DepartmentState extends EntityState<Department> {
    // additional entities state properties
    selectedDepartmentId: string | null;
    loading: boolean;
    error: string | null;
}

export const adapter: EntityAdapter<Department> = createEntityAdapter<Department>({
  selectId: (department) => department._id, // Custom selectId function
});
export const initialDepartmentState: DepartmentState = adapter.getInitialState({
    // additional entity state properties
    selectedDepartmentId: null,
    loading: false,
    error: null
  });
  export const departmentReducer = createReducer(
    initialDepartmentState,
    on(DepartmentActions.loadDepartment, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(DepartmentActions.loadDepartmentSuccess, (state, { departments }) => {
      return adapter.setAll(departments, {...state, loading: false })
    }),
    on(DepartmentActions.loadDepartmentFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(DepartmentActions.addDepartmentSuccess, (state, {department}) => {
      return adapter.addOne(department,state);
    }),
    on(DepartmentActions.loadDepartmentByIdSuccess, (state, {department}) => {
      return adapter.addOne(department, state);
    }),
    on(DepartmentActions.updateDepartmentSuccess, (state, {department})=>{
      return adapter.upsertOne(department, state)
    }),
    on(DepartmentActions.deleteDepartmentSuccess, (state,{id}) => {
      return adapter.removeOne(id,state);
    }),
    // on(UserActions.setUser, (state, { user }) => {
    //   return adapter.setOne(user, state)
    // }),
    // on(UserActions.upsertUser, (state, { user }) => {
    //   return adapter.upsertOne(user, state);
    // }),
    // on(UserActions.addUsers, (state, { users }) => {
    //   return adapter.addMany(users, state);
    // }),
    // on(UserActions.upsertUsers, (state, { users }) => {
    //   return adapter.upsertMany(users, state);
    // }),
    // on(UserActions.updateUser, (state, { update }) => {
    //   return adapter.updateOne(update, state);
    // }),
    // on(UserActions.updateUsers, (state, { updates }) => {
    //   return adapter.updateMany(updates, state);
    // }),
    // on(UserActions.mapUser, (state, { entityMap }) => {
    //   return adapter.mapOne(entityMap, state);
    // }),
    // on(UserActions.mapUsers, (state, { entityMap }) => {
    //   return adapter.map(entityMap, state);
    // }),
    // on(UserActions.deleteUser, (state, { id }) => {
    //   return adapter.removeOne(id, state);
    // }),
    // on(UserActions.deleteUsers, (state, { ids }) => {
    //   return adapter.removeMany(ids, state);
    // }),
    // on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
    //   return adapter.removeMany(predicate, state);
    // }),
    // on(UserActions.loadUsers, (state, { users }) => {
    //   return adapter.setAll(users, state);
    // }),
    // on(UserActions.setUsers, (state, { users }) => {
    //   return adapter.setMany(users, state);
    // }),
    // on(UserActions.clearUsers, state => {
    //   return adapter.removeAll({ ...state, selectedUserId: null });
    // })
  );

  export const getSelectedDepartmentId = (state: DepartmentState) => state.selectedDepartmentId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectDepartmentIds = selectIds;

// select the dictionary of user entities
export const selectDepartmentEntities = selectEntities;

// select the array of users
export const selectAllDepartments = selectAll;

// select the total user count
export const selectDepartmentTotal = selectTotal;