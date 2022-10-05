import React, { useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
    Tag,
    Tooltip,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUsers } from "../../store/users.slice";
const Users: React.FC = ({

}) => {
    const users = useAppSelector(state => state.users)
    const dispatch = useAppDispatch();

    const columns: { name: string; dataIndex: string; render?: (value, record) => React.ReactNode }[] = [
        { name: 'id', dataIndex: 'id', },
        { name: 'name', dataIndex: 'name', },
        { name: 'username', dataIndex: 'username', },
        { name: 'email', dataIndex: 'email', render: (v) => <Tag colorScheme='orange'>{v}</Tag> },
        { name: 'address', dataIndex: 'address', render: (v) => `${v.city}, ${v.suite}, ${v.street} (${v.zipcode})` },
        { name: 'phone', dataIndex: 'phone', },
        { name: 'website', dataIndex: 'website', },
        { name: 'company', dataIndex: 'company', render: (v) => <Tooltip hasArrow label={v.catchPhrase}>{v.name}</Tooltip> },
    ];

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);
    return (
        <TableContainer margin='6' padding='8px' borderRadius='16px' shadow='base' >
            {users.isLoading ? (
                <Center width='100%' height='350px'>
                    <Spinner mx='auto' />
                </Center>
            ) : (
                <Table size='sm' variant='striped' colorScheme='gray'>
                    <TableCaption>Users List</TableCaption>
                    <Thead>
                        <Tr>
                            {columns.map(col => <Th>{col.name}</Th>)}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.value.map((item, index) => (
                            <Tr key={index +'-'+item.id}>
                                {columns.map(col => <Td>{col.render ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}</Td>)}
                            </Tr>
                        ))}
                    </Tbody>
                    {/* {footer && <Tfoot>
                    <Tr>
                        {columns.map(col => <Th>{footer[col.dataIndex]}</Th>)}
                    </Tr>
                </Tfoot>} */}
                </Table>
            )}

        </TableContainer>
    )
}

export default Users;