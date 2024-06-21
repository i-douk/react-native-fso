import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { ReviewItem } from "./SingleRepositoryView";
import { ItemSeparator } from "./RepositoryItem";

const MyReviews = () => {
    const [accessToken, setAccessToken] = useState(null);
    const authStorage = useAuthStorage();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await authStorage.getAccessToken();
                setAccessToken(token);
            } catch (e) {
                console.log(e);
            }
        };
        fetchToken();
    }, [authStorage]);

    const { data, loading, error } = useQuery(ME, {
        skip: !accessToken, // Skip the query until the accessToken is set
        variables: { includeReviews: true },
        context: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    });

    if (loading) {
        return (
            <View>
                <Text>Loading reviews...</Text>
            </View>
        );
    }

    if (error) {
        console.log(error);
        return (
            <View>
                <Text>Error loading reviews</Text>
            </View>
        );
    }

    const reviews = data?.me?.reviews?.edges || [];

    return (
        <View>
            <FlatList
                data={reviews}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <ReviewItem review={item.node} />}
                keyExtractor={(item) => item.node.repositoryId}
            />
        </View>
    );
};

export default MyReviews;
